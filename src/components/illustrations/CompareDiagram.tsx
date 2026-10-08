import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { StepIcon, type StepIconName } from "./StepIcon";

type Flow = { title: string; steps: string[] };

type CompareDiagramProps = {
  label: string;
  without: Flow;
  with: Flow;
};

const withoutIcons: StepIconName[] = ["bag", "bird", "scatter", "truck", "broom"];
const withIcons: StepIconName[] = ["bag", "net", "truck"];

function FlowRowBad({ flow, icons }: { flow: Flow; icons: StepIconName[] }) {
  return (
    <div className="rounded-card border border-line bg-paper p-6 text-ink sm:p-8">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-stone">{flow.title}</h3>
      <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-4">
        {flow.steps.map((step, i) => {
          const last = i === flow.steps.length - 1;
          return (
            <li key={step} className="flex items-center gap-2">
              <span className="flex items-center gap-3">
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-full ${
                    last ? "bg-brick/15 text-brick" : "bg-cream text-bollard"
                  }`}
                >
                  <StepIcon name={icons[i]} className="size-6" />
                </span>
                <span className="text-[15px] font-semibold">{step}</span>
              </span>
              {!last && (
                <svg aria-hidden viewBox="0 0 24 12" className="mx-1 h-3 w-6 text-stone">
                  <path d="M0 6 H21 M16 1 L22 6 L16 11" fill="none" stroke="currentColor" strokeWidth={1.6} />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function GoodFlowRow({ flow, icons }: { flow: Flow; icons: StepIconName[] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || hasPlayedRef.current) return;
        hasPlayedRef.current = true;
        setActive(true);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cardStyle = {
    "--compare-steps": flow.steps.length,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      className="compare-good-card rounded-card border p-6 sm:p-8"
      data-active={active ? "true" : undefined}
      style={cardStyle}
    >
      <h3 className="compare-good-card__title text-sm font-semibold uppercase tracking-[0.14em]">{flow.title}</h3>
      <ol className="mt-6 flex list-none flex-wrap items-center gap-y-4 p-0">
        {flow.steps.map((step, i) => {
          const last = i === flow.steps.length - 1;
          const stepStyle = { "--step-index": i } as CSSProperties;
          const arrowStyle = { "--arrow-index": i } as CSSProperties;

          return (
            <Fragment key={step}>
              <li data-step={i} style={stepStyle}>
                <span className="compare-good-card__step-inner flex items-center gap-3">
                  <span
                    className={`compare-good-card__chip grid shrink-0 place-items-center rounded-full ${
                      last ? "compare-good-card__chip--accent" : ""
                    }`}
                  >
                    <StepIcon name={icons[i]} className="compare-good-card__icon" />
                  </span>
                  <span className="compare-good-card__label">{step}</span>
                </span>
              </li>
              {!last && (
                <li aria-hidden className="compare-good-card__arrow flex items-center" style={arrowStyle}>
                  <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0">
                    <path d="M0 6 H21 M16 1 L22 6 L16 11" fill="none" stroke="currentColor" strokeWidth={1.6} />
                  </svg>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}

export function CompareDiagram({ label, without, with: withFlow }: CompareDiagramProps) {
  return (
    <div role="group" aria-label={label} className="grid gap-4 lg:grid-cols-2">
      <FlowRowBad flow={without} icons={withoutIcons} />
      <GoodFlowRow flow={withFlow} icons={withIcons} />
    </div>
  );
}
