import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact-form";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Container } from "@/components/layout-primitives";
import { getCategories, getProducts, getSite } from "@/lib/content";
import { isLocale, pick } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const site = await getSite();
  const dict = getDictionary(locale);

  return buildMetadata({
    locale,
    path: routes.contact(locale),
    title: dict.contact.heading,
    description: pick(site.contactPage.lead, locale),
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ produkt?: string }>;
}) {
  const [{ locale }, { produkt }] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const [site, categories, products] = await Promise.all([
    getSite(),
    getCategories(),
    getProducts(),
  ]);

  const productGroups = categories
    .map((category) => ({
      label: pick(category.name, locale),
      options: products
        .filter((product) => product.category === category.slug)
        .map((product) => ({ slug: product.slug, name: pick(product.name, locale) })),
    }))
    .filter((group) => group.options.length > 0);

  const selected = products.find((product) => product.slug === produkt)?.slug;

  const { address, email, phone } = site.contact;
  const hasAddress = Boolean(address.street && address.city);

  return (
    <>
      <div className="border-b border-line bg-sand">
        <Container size="wide" className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">{dict.contact.heading}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {pick(site.contactPage.lead, locale)}
            </p>
          </div>
        </Container>
      </div>

      <Container size="wide" className="py-14 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 className="mb-7 text-2xl font-semibold text-ink">{dict.contact.formHeading}</h2>
            <ContactForm
              locale={locale}
              dict={dict}
              productGroups={productGroups}
              selectedProduct={selected}
            />
          </div>

          <aside className="space-y-10">
            <div className="rounded-(--radius-card) border border-line bg-sand p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {dict.contact.detailsHeading}
              </h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start gap-3 text-base font-medium text-ink transition-colors hover:text-pine"
                  >
                    <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                    {email}
                  </a>
                </li>
                {phone ? (
                  <li>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex items-start gap-3 text-base font-medium text-ink transition-colors hover:text-pine"
                    >
                      <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                      {phone}
                    </a>
                  </li>
                ) : null}
                {hasAddress ? (
                  <li className="flex items-start gap-3 text-base text-ink-soft">
                    <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pine" />
                    <span>
                      {address.street}
                      <br />
                      {address.postalCode} {address.city}
                      <br />
                      {pick(address.country, locale)}
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-ink">{dict.contact.faqHeading}</h2>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {site.contactPage.faq.map((entry) => (
                  <div key={pick(entry.question, locale)} className="py-4">
                    <dt className="text-base font-medium text-ink">
                      {pick(entry.question, locale)}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {pick(entry.answer, locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
