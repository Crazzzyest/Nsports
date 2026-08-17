"use client";

import { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { ProductMedia } from "@/components/product-media";
import type { IconKey, ProductImage } from "@/lib/content/types";
import { pick, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { format } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  accent,
  icon,
  locale,
  dict,
}: {
  images: ProductImage[];
  accent: string;
  icon: IconKey;
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState(0);
  const total = Math.max(images.length, 1);
  const current = images[active];

  const step = (direction: number) => setActive((index) => (index + direction + total) % total);

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-(--radius-card) border border-line bg-sand">
        <ProductMedia
          image={current}
          accent={accent}
          icon={icon}
          index={active}
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
          missingLabel={dict.product.imageMissing}
        />

        {total > 1 ? (
          <>
            <GalleryButton
              onClick={() => step(-1)}
              label={dict.product.galleryPrevious}
              className="left-3"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </GalleryButton>
            <GalleryButton
              onClick={() => step(1)}
              label={dict.product.galleryNext}
              className="right-3"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </GalleryButton>
            <span className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-2.5 py-1 text-xs font-medium text-ink-soft tabular-nums">
              {active + 1} / {total}
            </span>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={format(dict.product.galleryImage, { index: index + 1, total })}
                aria-current={index === active ? "true" : undefined}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-lg border transition-colors",
                  index === active ? "border-pine" : "border-line hover:border-line-strong",
                )}
              >
                <ProductMedia
                  image={image}
                  accent={accent}
                  icon={icon}
                  index={index}
                  sizes="100px"
                  missingLabel=""
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {current?.alt ? (
        <p className="mt-3 text-xs text-ink-muted">{pick(current.alt, locale)}</p>
      ) : null}
    </div>
  );
}

function GalleryButton({
  onClick,
  label,
  className,
  children,
}: {
  onClick: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm transition-colors hover:bg-paper",
        className,
      )}
    >
      {children}
    </button>
  );
}
