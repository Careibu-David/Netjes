import { useLanguage } from "../i18n/useLanguage";
import { CompareDiagram } from "./illustrations/CompareDiagram";
import { Section, SectionHeader } from "./ui/Section";

export function ImpactSection() {
  const { t } = useLanguage();
  const s = t.impact;
  return (
    <Section id="impact" labelledBy="impact-title">
      <SectionHeader id="impact-title" title={s.title} lead={s.lead} />

      <div className="mt-12 lg:mt-16">
        <CompareDiagram label={s.compare.label} without={s.compare.without} with={s.compare.with} />
      </div>
    </Section>
  );
}
