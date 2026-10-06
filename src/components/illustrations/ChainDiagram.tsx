import { StepIcon, type StepIconName } from "./StepIcon";

const icons: StepIconName[] = ["bag", "bird", "tornBag", "scatter"];

type ChainDiagramProps = {
  label: string;
  steps: { title: string }[];
};

export function ChainDiagram({ label, steps }: ChainDiagramProps) {
  return (
    <ol aria-label={label} className="grid gap-3 md:grid-cols-4 md:gap-0">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-4 md:flex-col md:gap-0 md:pr-6">
            <div className="flex flex-col items-center md:flex-row">
              <span
                className={`grid size-14 shrink-0 place-items-center rounded-full border ${
                  last ? "border-accent bg-accent-100 text-accent-600" : "border-line bg-paper text-bollard"
                }`}
              >
                <StepIcon name={icons[i]} className="size-7" />
              </span>
              {!last && (
                <span aria-hidden className="my-1 w-px flex-1 bg-sage md:mx-3 md:my-0 md:h-px md:w-auto md:flex-1" />
              )}
            </div>
            <div className="pb-6 md:pb-0 md:pt-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-stone">0{i + 1}</p>
              <h3 className="mt-1 max-w-[14.5rem] text-lg font-bold leading-snug text-ink">{step.title}</h3>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
