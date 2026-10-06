import { Bird, Brush, Check, House, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import ideaVideoUrl from "../../Videos/Video 2.mp4?url";
import { site } from "../config/site";
import { useLanguage } from "../i18n/useLanguage";
import { StepIcon, type StepIconName } from "./illustrations/StepIcon";
import { ButtonLink } from "./ui/Button";
import { Card } from "./ui/Card";
import { Section, SectionHeader } from "./ui/Section";

const benefitIcons: Record<string, LucideIcon> = {
  streets: Sparkles,
  cleanup: Brush,
  birds: Bird,
  living: House,
  visitors: Users,
};

const benefitStepIcons: Partial<Record<string, StepIconName>> = {
  scatter: "scatter",
};

export function SolutionSection() {
  const { t } = useLanguage();
  const s = t.solution;
  const impact = t.impact;
  const impactCards = impact.cards;
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const benefitsRef = useRef<HTMLUListElement>(null);
  const [benefitsActive, setBenefitsActive] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    const video = videoRef.current;
    if (!figure || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.35 },
    );

    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = benefitsRef.current;
    if (!el || benefitsActive) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBenefitsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [benefitsActive]);

  return (
    <Section id="idea" tone="green" labelledBy="idea-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader id="idea-title" title={s.title} tone="dark" />
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-cream/80">
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {s.points.map((point) => (
              <li key={point} className="flex items-center gap-3 font-semibold text-cream">
                <span className="grid size-6 place-items-center rounded-full bg-accent text-ink">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <figure ref={figureRef} className="lg:col-span-7">
          <div className="overflow-hidden rounded-[28px] border border-cream/10 bg-paper">
            <video
              ref={videoRef}
              src={ideaVideoUrl}
              className="aspect-[404/224] w-full origin-[58%_84%] scale-[1.75] object-cover object-[58%_84%]"
              muted
              loop
              playsInline
              preload="auto"
              aria-label={s.sceneLabel}
            />
          </div>
          <figcaption className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-cream/70">
            <span aria-hidden className="idea-caption-radio mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
            {s.japan}
          </figcaption>
          <ButtonLink
            href={site.japanWasteNetArticleUrl}
            variant="ghostDark"
            size="md"
            className="mt-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.japanArticleCta}
          </ButtonLink>
        </figure>
      </div>

      <h2 className="mt-12 text-left text-3xl font-bold text-cream sm:text-4xl lg:mt-16">{impact.cardsHeading}</h2>
      <ul
        ref={benefitsRef}
        data-active={benefitsActive || undefined}
        className="impact-benefits mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {impactCards.map((card, i) => {
          const Icon = benefitIcons[card.id] ?? Sparkles;
          const stepIcon = benefitStepIcons[card.id];
          return (
            <li
              key={card.id}
              className="impact-benefits__card"
              style={{ "--step-index": i } as CSSProperties}
            >
              <Card className="h-full">
                {stepIcon ? (
                  <StepIcon name={stepIcon} className="size-6 text-bollard-500" />
                ) : (
                  <Icon className="size-6 text-bollard-500" strokeWidth={1.8} aria-hidden />
                )}
                <h3 className="mt-5 text-xl font-bold text-ink">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{card.text}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
