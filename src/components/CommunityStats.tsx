import { ArrowRight } from "lucide-react";
import { pilotStats, type PilotStatKey } from "../content/stats";
import { useLanguage } from "../i18n/useLanguage";
import { ButtonLink } from "./ui/Button";
import { Section, SectionHeader } from "./ui/Section";

const order: PilotStatKey[] = ["streets", "residents", "areas"];

export function CommunityStats() {
  const { t } = useLanguage();
  const s = t.stats;
  return (
    <Section id="progress" tone="paper" labelledBy="progress-title" className="border-y border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <SectionHeader id="progress-title" title={s.title} lead={s.lead} />
          <ButtonLink href="#apply" size="lg" className="mt-8">
            {t.hero.primaryCta}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="lg:col-span-6">
          <dl className="grid grid-cols-3 divide-x divide-line rounded-card border border-line bg-cream">
            {order.map((key) => (
              <div key={key} className="px-4 py-7 sm:px-7 sm:py-9">
                <dt className="text-sm font-medium leading-snug text-ink-soft">{s.items[key]}</dt>
                <dd className="mt-3 text-4xl font-extrabold tracking-tight text-bollard sm:text-5xl">{pilotStats[key]}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-stone">{s.demoNote}</p>
        </div>
      </div>
    </Section>
  );
}
