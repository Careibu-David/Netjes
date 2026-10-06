import { ArrowRight, Info } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { categoryStyles, filterOrder } from "../data/map/categories";
import { pilotFeatures } from "../data/map/pilot-features";
import { MAP_CATEGORIES, type MapCategory } from "../data/map/types";
import { useLanguage } from "../i18n/useLanguage";
import { CategorySwatch } from "./map/CategorySwatch";
import { ButtonLink } from "./ui/Button";
import { Section, SectionHeader } from "./ui/Section";

const MapCanvas = lazy(() => import("./map/MapCanvas"));

const allVisible = Object.fromEntries(MAP_CATEGORIES.map((c) => [c, true])) as Record<MapCategory, boolean>;

const filterableCategories = new Set<MapCategory>(["pilot", "requested", "underground", "problemArea"]);
const shownFilters = filterOrder.filter((c) => filterableCategories.has(c));

export function AmsterdamMap() {
  const { t } = useLanguage();
  const m = t.map;
  const [visible, setVisible] = useState(allVisible);
  const everythingOn = shownFilters.every((c) => visible[c]);

  const toggle = (c: MapCategory) => setVisible((v) => ({ ...v, [c]: !v[c] }));

  return (
    <Section id="map" tone="paper" labelledBy="map-title" className="border-y border-line">
      <div className="max-w-3xl">
        <SectionHeader id="map-title" title={m.title} lead={m.lead} />
        <ButtonLink href="#apply" size="lg" className="mt-8">
          {t.hero.primaryCta}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>

      <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-cream lg:mt-14 lg:grid lg:grid-cols-12">
        <div className="border-b border-line p-4 sm:p-5 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-7 xl:col-span-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-stone">{m.filtersLabel}</h3>
            {!everythingOn && (
              <button type="button" onClick={() => setVisible(allVisible)} className="text-sm font-semibold text-bollard hover:underline">
                {m.showAll}
              </button>
            )}
          </div>
          <ul className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-5 sm:px-5 lg:mx-0 lg:mt-5 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
            {shownFilters.map((c) => {
              const on = visible[c];
              const cat = m.categories[c];
              return (
                <li key={c} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(c)}
                    className={`flex w-full items-center gap-3 rounded-full border px-3.5 py-2 text-left text-sm font-semibold transition-colors lg:rounded-xl lg:px-3 lg:py-3 ${
                      on
                        ? "border-line bg-paper text-ink"
                        : "border-transparent bg-transparent text-stone hover:text-ink"
                    }`}
                  >
                    <span className={`grid w-4 shrink-0 place-items-center ${on ? "" : "opacity-35 grayscale"}`}>
                      <CategorySwatch style={categoryStyles[c]} />
                    </span>
                    <span className="min-w-0">
                      <span className="block whitespace-nowrap lg:whitespace-normal">{cat.label}</span>
                      <span className="mt-0.5 hidden text-[13px] font-normal leading-snug text-ink-soft lg:block">{cat.description}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 hidden gap-2 text-[13px] leading-relaxed text-stone lg:flex">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {m.disclaimer}
          </p>
        </div>

        <div className="relative h-[60vh] min-h-[380px] max-h-[640px] lg:col-span-8 lg:h-auto lg:min-h-[640px] lg:max-h-none xl:col-span-9">
          <Suspense fallback={<div className="h-full w-full bg-bollard-100" />}>
            <MapCanvas data={pilotFeatures} visible={visible} />
          </Suspense>
        </div>
      </div>

      <p className="mt-4 flex gap-2 text-[13px] leading-relaxed text-stone lg:hidden">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {m.disclaimer}
      </p>
    </Section>
  );
}
