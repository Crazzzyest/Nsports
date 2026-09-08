import { createHash } from "node:crypto";

import { getProduct } from "@/lib/content";
import type { EnquiryField, EnquiryState } from "@/lib/enquiry-types";
import { pick, type Locale } from "@/lib/i18n/config";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Enkel frekvensbegrensning i minnet. På en serverløs plattform lever
 * minnet bare så lenge instansen gjør, så dette stopper en enkelt
 * gjentakende avsender — ikke et fordelt angrep. Det holder mot støy
 * på et kontaktskjema.
 */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > MAX_PER_WINDOW;
}

function read(formData: FormData, field: EnquiryField): string {
  return String(formData.get(field) ?? "").trim();
}

export async function handleEnquiry(
  formData: FormData,
  locale: Locale,
  clientKey: string,
): Promise<EnquiryState> {
  // Skjult felt. Fylles bare ut av automatiske innsendinger.
  if (String(formData.get("firmanavn") ?? "") !== "") {
    return { status: "success", errors: {}, values: {} };
  }

  const values: EnquiryState["values"] = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    phone: read(formData, "phone"),
    organisation: read(formData, "organisation"),
    customerType: read(formData, "customerType"),
    product: read(formData, "product"),
    quantity: read(formData, "quantity"),
    message: read(formData, "message"),
  };

  const errors: EnquiryState["errors"] = {};
  if (!values.name) errors.name = "required";
  if (!values.email) errors.email = "required";
  else if (!emailPattern.test(values.email)) errors.email = "invalidEmail";
  if (!values.message) errors.message = "required";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  if (rateLimited(clientKey)) {
    return { status: "error", errors: {}, values };
  }

  const product = values.product ? await getProduct(values.product) : undefined;

  const productName = product ? pick(product.name, locale) : "Generell henvendelse";
  const lines: [string, string][] = [
    ["Navn", values.name!],
    ["E-post", values.email!],
    ["Telefon", values.phone || "—"],
    ["Klubb/bedrift", values.organisation || "—"],
    ["Kundetype", values.customerType || "—"],
    ["Produkt", productName],
    ["Antall", values.quantity || "—"],
    ["Språk på siden", locale],
  ];

  const subject = `Henvendelse fra nsports.no: ${productName}`;
  const text = [
    ...lines.map(([label, value]) => `${label}: ${value}`),
    "",
    "Melding:",
    values.message!,
  ].join("\n");

  const html = `
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      ${lines
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#6b756f">${escapeHtml(label)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:20px">${escapeHtml(values.message!)}</p>
  `;

  const sent = await sendEnquiryEmail({
    to: process.env.ENQUIRY_TO ?? "edsongreistad99@gmail.com",
    replyTo: values.email!,
    subject,
    text,
    html,
  });

  return sent
    ? { status: "success", errors: {}, values: {} }
    : { status: "error", errors: {}, values };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sender via Resend. Uten RESEND_API_KEY logges henvendelsen i stedet,
 * slik at skjemaet kan testes før e-post er satt opp.
 */
async function sendEnquiryEmail(message: {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      `[henvendelse] RESEND_API_KEY er ikke satt — henvendelsen ble ikke sendt på e-post.\n${message.text}`,
    );
    return true;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Nøkkelen bygges fra selve innholdet, ikke avsender + emne (emnet er
        // nesten alltid "Generell henvendelse", så to ulike henvendelser fra
        // samme person ville ellers kollidert). Et dobbeltklikk sender identisk
        // payload → samme hash → dedupliseres. Tidsvinduet slipper gjennom en
        // bevisst identisk gjeninnsending senere (Resend-nøkler utløper etter 24t).
        "Idempotency-Key": `enquiry/${createHash("sha256")
          .update(`${message.replyTo}\n${message.text}`)
          .digest("hex")}/${Math.floor(Date.now() / 600_000)}`,
      },
      body: JSON.stringify({
        // Resends delte testdomene fungerer uten at nsports.no er verifisert.
        // Bytt til ENQUIRY_FROM med eget verifisert domene når det er klart.
        from: process.env.ENQUIRY_FROM ?? "NordicSports <onboarding@resend.dev>",
        to: [message.to],
        reply_to: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html,
      }),
    });

    if (!response.ok) {
      console.error(`[henvendelse] Resend svarte ${response.status}: ${await response.text()}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[henvendelse] Klarte ikke å sende e-post", error);
    return false;
  }
}
