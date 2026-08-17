/**
 * Vises så lenge produktbilder og spesifikasjoner er utkast.
 * Skru av ved å sette NEXT_PUBLIC_DRAFT_BANNER=off.
 */
export function DraftBanner({ text }: { text: string }) {
  if (process.env.NEXT_PUBLIC_DRAFT_BANNER === "off") return null;

  return (
    <div className="border-b border-brass/25 bg-brass-soft">
      <p className="mx-auto max-w-7xl px-5 py-2 text-center text-xs leading-relaxed text-brass sm:px-8">
        {text}
      </p>
    </div>
  );
}
