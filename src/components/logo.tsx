import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "pine",
}: {
  className?: string;
  tone?: "pine" | "paper";
}) {
  const image = (
    <Image
      src="/bilder/logo/nordicsports-logo.png"
      alt="NordicSports"
      width={1432}
      height={450}
      priority
      className="h-8 w-auto"
    />
  );

  // Logoen har mørk tekst, så på den mørke footeren legges den på en lys flate
  // slik at både merket og ordmerket er lesbart uten en egen lys logovariant.
  if (tone === "paper") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-lg bg-paper px-3 py-2",
          className,
        )}
      >
        {image}
      </span>
    );
  }

  return <span className={cn("inline-flex items-center", className)}>{image}</span>;
}
