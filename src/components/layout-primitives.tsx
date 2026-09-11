import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", widths[size], className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "sand" | "pine";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper",
    sand: "bg-gradient-to-b from-sand to-sand-deep",
    pine: "bg-pine text-paper",
  };
  return (
    <section id={id} className={cn("py-16 sm:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 sm:mb-14",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
        {body ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{body}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-pine-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

const buttonStyles = {
  primary:
    "bg-pine text-paper hover:bg-pine-dark focus-visible:outline-pine-dark border border-transparent",
  secondary:
    "bg-paper text-ink border border-line-strong hover:border-pine hover:text-pine",
  ghost: "text-pine hover:text-pine-dark underline-offset-4 hover:underline border border-transparent",
  onPine: "bg-paper text-pine hover:bg-pine-50 border border-transparent",
  onDark: "bg-transparent text-paper border border-paper/50 hover:bg-paper hover:text-ink",
};

const buttonSizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

type ButtonVariant = keyof typeof buttonStyles;
type ButtonSize = keyof typeof buttonSizes;

function buttonClass(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variant !== "ghost" && buttonSizes[size],
    buttonStyles[variant],
    className,
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function Prose({
  children,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={cn("space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg", className)}>
      {children}
    </Tag>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "pine" | "brass";
  className?: string;
}) {
  const tones = {
    neutral: "bg-sand-deep text-ink-soft",
    pine: "bg-pine-50 text-pine",
    brass: "bg-brass-soft text-brass",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
