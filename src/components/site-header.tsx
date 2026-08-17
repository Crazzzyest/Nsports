import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ButtonLink, Container } from "@/components/layout-primitives";
import { Logo } from "@/components/logo";
import { MobileNav, type NavItem } from "@/components/mobile-nav";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { routes } from "@/lib/i18n/routes";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items: NavItem[] = [
    { href: routes.products(locale), label: dict.nav.products },
    { href: routes.about(locale), label: dict.nav.about },
    { href: routes.contact(locale), label: dict.nav.contact },
  ];
  const cta: NavItem = { href: routes.contact(locale), label: dict.actions.requestQuote };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-6 sm:h-18">
          <Link href={routes.home(locale)} aria-label="NSports">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label={dict.nav.menu}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-pine"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              locale={locale}
              label={dict.language.label}
              className="hidden sm:flex"
            />
            <ButtonLink href={cta.href} className="hidden lg:inline-flex">
              {cta.label}
            </ButtonLink>
            <MobileNav
              items={items}
              cta={cta}
              locale={locale}
              labels={{
                menu: dict.nav.menu,
                close: dict.nav.close,
                language: dict.language.label,
              }}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
