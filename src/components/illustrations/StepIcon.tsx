import type { ReactNode } from "react";

export type StepIconName = "bag" | "bird" | "tornBag" | "scatter" | "net" | "truck" | "broom" | "delivery";

const BAG = "M9.5 27 C6 20 8 14 13 12 L11 7.5 L16 9.5 L21 7.5 L19 12 C24 14 26 20 22.5 27 Z";

const paths: Record<StepIconName, ReactNode> = {
  bag: <path d={BAG} />,
  bird: (
    <>
      <path d="M4 17 C8 12 12 12 16 17 C20 12 24 12 28 17" />
      <path d="M13 22 C15 20.5 17 20.5 19 22" />
    </>
  ),
  tornBag: (
    <>
      <path d={BAG} />
      <path d="M11.5 19 L14 22 L16.5 18 L19 21.5 L21 18.5" />
    </>
  ),
  scatter: (
    <>
      <path d="M3 28 H29" />
      <path d="M5 21 L11 20 L11.5 24 L5.5 25 Z" />
      <circle cx="19" cy="23" r="2.2" />
      <path d="M23 13 L28 15 L25.5 19.5 Z" />
      <path d="M10 10 L14 9 L15 13 L11 14 Z" />
      <path d="M18 7 L20 8" />
    </>
  ),
  net: (
    <>
      <path d={BAG} />
      <path d="M4 28 C4 12 28 12 28 28" />
      <path d="M8 17 L22 28 M24 17 L10 28 M16 14 V28" />
      <path d="M3 28.5 H29" />
    </>
  ),
  truck: (
    <>
      <path d="M3 9 H18 V22 H3 Z" />
      <path d="M18 13 H24 L28 17.5 V22 H18" />
      <circle cx="8.5" cy="23.5" r="2.5" />
      <circle cx="22.5" cy="23.5" r="2.5" />
    </>
  ),
  delivery: (
    <>
      <path d="M16 8 C12.5 5.8 11.6 3.6 13.2 2.6 C14.4 1.9 15.6 2.5 16 3.5 C16.4 2.5 17.6 1.9 18.8 2.6 C20.4 3.6 19.5 5.8 16 8 Z" />
      <path d="M5 11.5 H27 V16 H5 Z" />
      <path d="M7 16 V28 H25 V16" />
      <path d="M16 11.5 V28" />
    </>
  ),
  broom: (
    <>
      <path d="M24 4 L16 17" />
      <path d="M11 15 L20 20 L16 28 C11 27 7 24 5 21 Z" />
      <path d="M9 23 L12 19 M13 26 L15.5 21" />
    </>
  ),
};

export function StepIcon({ name, className = "" }: { name: StepIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
