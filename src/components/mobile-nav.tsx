"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import type { Locale } from "@/lib/i18n/config";

export type NavItem = { href: string; label: string };

export function MobileNav({
  items,
  cta,
  locale,
  labels,
}: {
  items: NavItem[];
  cta: NavItem;
  locale: Locale;
  labels: { menu: string; close: string; language: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.menu}
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {open
        ? createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto bg-paper">
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-5 py-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-2xl font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-pine px-6 py-3.5 text-base font-medium text-paper"
            >
              {cta.label}
            </Link>

            <div className="mt-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {labels.language}
              </p>
              <LanguageSwitcher
                locale={locale}
                label={labels.language}
                variant="named"
                onNavigate={() => setOpen(false)}
                className="-ml-1"
              />
            </div>
          </nav>
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
