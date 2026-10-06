import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { StepIcon, type StepIconName } from "./illustrations/StepIcon";
import { ButtonLink } from "./ui/Button";
import { Section, SectionHeader } from "./ui/Section";

const icons: StepIconName[] = ["delivery", "bag", "net", "truck"];

/** Matches 4 × (--how-step-stagger + ends with --how-step-duration) in index.css */
const HOW_SEQUENCE_MS = 5000;

export function HowItWorks() {
  const { t } = useLanguage();
  const s = t.how;
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el || active) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSettled(true);
      return;
    }
    const timer = window.setTimeout(() => setSettled(true), HOW_SEQUENCE_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <Section id="how" labelledBy="how-title">
      <SectionHeader id="how-title" title={s.title} />
      <ol
        ref={listRef}
        data-active={active}
        data-settled={settled || undefined}
        className="how-steps mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
      >
        {s.steps.map((step, i) => (
          <li
            key={step.title}
            className={`how-steps__card flex flex-col rounded-card border p-7 transition-colors duration-500 sm:p-8 ${
              settled ? "border-bollard bg-bollard" : "border-line bg-paper"
            }`}
            style={{ "--step-index": i } as CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span className={`text-5xl font-extrabold tracking-tight ${settled ? "text-cream" : "text-bollard"}`}>
                0{i + 1}
              </span>
              <StepIcon name={icons[i]} className={`size-9 ${settled ? "text-cream" : "text-bollard"}`} />
            </div>
            <h3 className={`mt-10 text-2xl font-bold ${settled ? "text-cream" : "text-ink"}`}>{step.title}</h3>
            <p className={`mt-3 leading-relaxed ${settled ? "text-cream/85" : "text-ink-soft"}`}>{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex justify-start lg:mt-16">
        <ButtonLink href="#apply" size="lg">
          {t.hero.primaryCta}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </Section>
  );
}
