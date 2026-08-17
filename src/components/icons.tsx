import type { SVGProps } from "react";

import type { IconKey } from "@/lib/content/types";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 5h13" />
      <path d="M5.5 5v4.5" />
      <path d="M14.5 5v4.5" />
      <path d="M3 13.5h11l3 3h4v2.5" />
      <path d="M3 13.5V19h1.5" />
      <path d="M9.5 19h6" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="17.5" cy="19" r="2" />
    </Svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </Svg>
  );
}

export function RobotIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="8.5" width="17" height="11" rx="3" />
      <path d="M12 4.5v4" />
      <circle cx="12" cy="3.4" r="1.4" />
      <circle cx="9" cy="13.5" r="1.1" />
      <circle cx="15" cy="13.5" r="1.1" />
      <path d="M9.5 16.5h5" />
    </Svg>
  );
}

export function BallIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9.5" cy="9.5" r="0.9" />
      <circle cx="14.5" cy="9.5" r="0.9" />
      <circle cx="12" cy="13" r="0.9" />
      <circle cx="9.5" cy="16" r="0.9" />
      <circle cx="14.8" cy="15.4" r="0.9" />
    </Svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 11.8V4.6a1 1 0 011-1h7.2l8.7 8.7-8.2 8.2-8.7-8.7z" />
      <circle cx="7.8" cy="7.8" r="1.4" />
    </Svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 6.5h11v10h-11z" />
      <path d="M13.5 10h4l4 3.5v3h-8z" />
      <circle cx="7" cy="18.5" r="1.8" />
      <circle cx="17" cy="18.5" r="1.8" />
    </Svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l7.5 2.8v5.4c0 4.6-3.1 8.4-7.5 10.3-4.4-1.9-7.5-5.7-7.5-10.3V5.8L12 3z" />
      <path d="M8.8 12.2l2.3 2.3 4.1-4.4" />
    </Svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 19.5c0-8.3 5.2-14 15-14 0 8.3-5.5 14-15 14z" />
      <path d="M4.5 19.5c2.8-5.2 6.2-8.5 10.5-10.6" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12h14" />
      <path d="M12.5 6l6 6-6 6" />
    </Svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5v11" />
      <path d="M7.5 10.5l4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </Svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 5.5l-7 6.5 7 6.5" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 5.5l7 6.5-7 6.5" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 9l6.5 7 6.5-7" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 7h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 17h17" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 5.5l13 13" />
      <path d="M18.5 5.5l-13 13" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7 2 2 0 016.5 3.5z" />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21.5c4.5-5 7-8.4 7-11.5a7 7 0 10-14 0c0 3.1 2.5 6.5 7 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.3 2.4 3.5 5.3 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.3-3.5-8.5S9.7 5.9 12 3.5z" />
    </Svg>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 21V3.5" />
      <path d="M6.5 4.5l11 3.2-11 3.3" />
      <path d="M4 21h6" />
    </Svg>
  );
}

const categoryIcons: Record<IconKey, (props: IconProps) => React.ReactElement> = {
  cart: CartIcon,
  target: TargetIcon,
  robot: RobotIcon,
  ball: BallIcon,
  tag: TagIcon,
  truck: TruckIcon,
  shield: ShieldIcon,
  leaf: LeafIcon,
};

export function Icon({ name, ...props }: IconProps & { name: IconKey }) {
  const Component = categoryIcons[name] ?? BallIcon;
  return <Component {...props} />;
}
