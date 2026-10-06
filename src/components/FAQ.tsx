import { ArrowRight, Plus } from "lucide-react";
import { useLanguage } from "../i18n/useLanguage";
import { Section, SectionHeader } from "./ui/Section";

export function FAQ() {
  const { t } = useLanguage();
  const s = t.faq;
  const lastIndex = s.items.length - 1;
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <SectionHeader id="faq-title" title={s.title} className="lg:col-span-4" />
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {s.items.map((item, i) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold text-ink hover:text-bollard sm:text-xl">
                {item.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-bollard group-open:rotate-45 group-open:border-bollard group-open:bg-bollard group-open:text-cream">
                  <Plus className="size-4" aria-hidden />
                </span>
              </summary>
              <div className="max-w-2xl pb-7 pr-12 leading-relaxed text-ink-soft">
                <p>{item.a}</p>
                {i === lastIndex && (
                  <a href="#apply" className="mt-4 inline-flex items-center gap-2 font-semibold text-bollard underline-offset-4 hover:underline">
                    {s.applyLink}
                    <ArrowRight className="size-4" aria-hidden />
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
