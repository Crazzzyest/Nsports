import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-8 w-8", className)} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="currentColor" />
      {/* Fordypningene tegnes som gjennomsiktig sort, slik at merket virker
          både på lys og mørk bakgrunn uten to varianter av logoen. */}
      <g fill="#000" opacity="0.34">
        <circle cx="10.8" cy="11" r="1.7" />
        <circle cx="16.6" cy="9.2" r="1.7" />
        <circle cx="21.6" cy="12.6" r="1.7" />
        <circle cx="13" cy="16.4" r="1.7" />
        <circle cx="19.2" cy="17.8" r="1.7" />
        <circle cx="11.4" cy="21.6" r="1.7" />
        <circle cx="16.6" cy="23" r="1.7" />
        <circle cx="22.2" cy="18.6" r="1.7" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  tone = "pine",
}: {
  className?: string;
  tone?: "pine" | "paper";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-7 w-7", tone === "pine" ? "text-pine" : "text-paper")} />
      <span
        className={cn(
          "text-xl font-semibold tracking-tight",
          tone === "pine" ? "text-ink" : "text-paper",
        )}
      >
        NSports
      </span>
    </span>
  );
}
