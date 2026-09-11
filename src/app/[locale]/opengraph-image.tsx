import { ImageResponse } from "next/og";

import { getSite } from "@/lib/content";
import { isLocale, locales, pick, defaultLocale } from "@/lib/i18n/config";

/**
 * Bildet som vises når en lenke deles i sosiale medier eller i en chat.
 * Genereres ved bygging, ett per språk.
 */

export const alt = "NordicSports";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const site = await getSite();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08321F",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              backgroundColor: "#ffffff",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.02em" }}>
            NordicSports
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {pick(site.hero.title, locale)}
          </span>
          <span style={{ fontSize: 30, color: "#A9C8B7" }}>
            {pick(site.brand.tagline, locale)}
          </span>
        </div>

        <span style={{ fontSize: 26, color: "#A9C8B7" }}>nsports.no</span>
      </div>
    ),
    size,
  );
}
