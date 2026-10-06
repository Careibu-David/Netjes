import type { CategoryStyle } from "../../data/map/categories";

export function CategorySwatch({ style }: { style: CategoryStyle }) {
  const { kind, color } = style;
  if (kind === "point") {
    return <span aria-hidden className="size-3 rounded-full ring-2 ring-white" style={{ background: color }} />;
  }
  if (kind === "zone") {
    return (
      <span
        aria-hidden
        className="h-3 w-4 rounded-[3px] border border-dashed"
        style={{ borderColor: color, background: `${color}33` }}
      />
    );
  }
  if (kind === "dashedLine") {
    return (
      <span
        aria-hidden
        className="h-1 w-4"
        style={{ backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 7px)` }}
      />
    );
  }
  return <span aria-hidden className="h-1.5 w-4 rounded-full" style={{ background: color }} />;
}
