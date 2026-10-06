import { useLanguage } from "../i18n/useLanguage";
import { Section } from "./ui/Section";

export function QuoteSection() {
  const { t } = useLanguage();
  const { title, paragraphs } = t.quote;

  return (
    <Section id="quote" tone="green" labelledBy="quote-title" containerClassName="text-center">
      <h2 id="quote-title" className="text-4xl font-bold leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <figure className="mx-auto mt-10 max-w-3xl sm:mt-12">
        <blockquote className="space-y-6">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-lg font-medium leading-relaxed text-cream sm:text-xl lg:text-2xl lg:leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </blockquote>
      </figure>
    </Section>
  );
}
