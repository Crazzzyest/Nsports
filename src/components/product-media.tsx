import Image from "next/image";

import { Icon } from "@/components/icons";
import type { IconKey, ProductImage } from "@/lib/content/types";
import { cn, tint } from "@/lib/utils";

/**
 * Viser produktbildet, eller en plassholder i kategoriens farge når bildet
 * ennå ikke er lastet opp. Katalogen kan dermed publiseres før alle
 * produktbildene er på plass, uten ødelagte bilder.
 *
 * Krever at forelderen har `position: relative` og en høyde.
 */
export function ProductMedia({
  image,
  accent,
  icon,
  index = 0,
  seed,
  sizes,
  priority = false,
  missingLabel,
  className,
}: {
  image?: ProductImage;
  accent: string;
  icon: IconKey;
  index?: number;
  /** Gir to naboprodukter i samme kategori litt ulik plassholder. */
  seed?: string;
  sizes: string;
  priority?: boolean;
  missingLabel: string;
  className?: string;
}) {
  const alt = image?.alt?.no ?? "";

  if (image?.src) {
    return (
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-contain p-2", className)}
      />
    );
  }

  // Litt ulik toning per bilde, slik at et galleri av plassholdere ikke
  // ser ut som samme bilde gjentatt tre ganger.
  const variant = (index + (seed ? hash(seed) : 0)) % 3;
  const strength = [10, 17, 6][variant];
  const iconScale = ["w-1/4", "w-1/5", "w-[23%]"][variant];

  return (
    <div
      className={cn("flex h-full w-full items-center justify-center", className)}
      style={{ backgroundColor: tint(accent, strength) }}
      role="img"
      aria-label={alt || missingLabel}
    >
      <div className="placeholder-weave absolute inset-0" style={{ color: accent }} />
      <Icon
        name={icon}
        className={cn("relative max-w-24 min-w-10", iconScale)}
        style={{ color: accent, opacity: 0.4 }}
      />
      <span
        className="absolute inset-x-0 bottom-0 truncate px-3 py-2 text-center text-[11px] font-medium tracking-wide"
        style={{ color: accent, opacity: 0.65 }}
      >
        {missingLabel}
      </span>
    </div>
  );
}

function hash(value: string): number {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    total = (total + value.charCodeAt(index)) % 997;
  }
  return total;
}
