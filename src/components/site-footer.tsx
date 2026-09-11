import Link from "next/link";

import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Container } from "@/components/layout-primitives";
import { Logo } from "@/components/logo";
import type { Category, SiteContent } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { format } from "@/lib/i18n/format";
import { routes } from "@/lib/i18n/routes";

export function SiteFooter({
  locale,
  dict,
  site,
  categories,
}: {
  locale: Locale;
  dict: Dictionary;
  site: SiteContent;
  categories: Category[];
}) {
  const { address } = site.contact;
  const hasAddress = Boolean(address.street && address.city);

  return (
    <footer className="mt-auto bg-pine-dark text-pine-100">
      <Container size="wide">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-pine-200">
              {pick(site.brand.tagline, locale)}
            </p>
          </div>

          <FooterColumn heading={dict.footer.productsHeading}>
            {categories.map((category) => (
              <FooterLink key={category.slug} href={routes.category(locale, category.slug)}>
                {pick(category.name, locale)}
              </FooterLink>
            ))}
            <FooterLink href={routes.products(locale)}>{dict.actions.seeAllProducts}</FooterLink>
          </FooterColumn>

          <FooterColumn heading={dict.footer.companyHeading}>
            <FooterLink href={routes.about(locale)}>{dict.nav.about}</FooterLink>
            <FooterLink href={routes.contact(locale)}>{dict.nav.contact}</FooterLink>
          </FooterColumn>

          <FooterColumn heading={dict.footer.contactHeading}>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-start gap-2.5 text-sm text-pine-200 transition-colors hover:text-paper"
              >
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {site.contact.email}
              </a>
            </li>
            {site.contact.phone ? (
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-start gap-2.5 text-sm text-pine-200 transition-colors hover:text-paper"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  {site.contact.phone}
                </a>
              </li>
            ) : null}
            {hasAddress ? (
              <li className="flex items-start gap-2.5 text-sm text-pine-200">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                  <br />
                  {pick(address.country, locale)}
                </span>
              </li>
            ) : null}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 border-t border-pine-400/30 py-6 text-xs text-pine-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {format(dict.footer.rights, {
              year: new Date().getFullYear(),
              company: pick(site.brand.legalName, locale),
            })}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
        {heading}
      </h2>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-pine-200 transition-colors hover:text-paper"
      >
        {children}
      </Link>
    </li>
  );
}
