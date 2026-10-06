import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "cream" | "paper" | "green";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  paper: "bg-paper text-ink",
  green: "bg-bollard text-cream",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

export function Section({ id, tone = "cream", className = "", containerClassName = "", labelledBy, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-20 sm:py-24 lg:py-32 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type SectionHeaderProps = {
  id: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({ id, title, lead, tone = "light", className = "" }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 id={id} className={`text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl ${dark ? "text-cream" : "text-amsterdam-purple-brown"}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${dark ? "text-cream/80" : "text-ink-soft"}`}>{lead}</p>
      )}
    </div>
  );
}
