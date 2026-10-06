import { problemCompareVideos } from "../assets/problem-compare-videos";
import { useLanguage } from "../i18n/useLanguage";
import { ChainDiagram } from "./illustrations/ChainDiagram";
import { StreetCompare } from "./illustrations/StreetCompare";
import { Section, SectionHeader } from "./ui/Section";

export function ProblemSection() {
  const { t } = useLanguage();
  const p = t.problem;
  return (
    <Section id="problem" tone="paper" labelledBy="problem-title" className="border-y border-line">
      <SectionHeader id="problem-title" title={p.title} lead={p.lead} />

      <div className="mt-14 lg:mt-20">
        <StreetCompare
          label={p.compare.label}
          hint={p.compare.hint}
          messyTitle={p.sceneLabel}
          cleanTitle={p.compare.cleanSceneLabel}
          beforeVideoSrc={problemCompareVideos.before}
          afterVideoSrc={problemCompareVideos.after}
        />
      </div>

      <div className="mt-14 lg:mt-16">
        <ChainDiagram label={p.chainLabel} steps={p.chain} />
      </div>
    </Section>
  );
}
