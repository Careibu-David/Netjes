import type { MapCategory } from "./types";

export type CategoryStyle = {
  kind: "line" | "dashedLine" | "zone" | "point";
  color: string;
};

/** Draw order: first is lowest. */
export const categoryStyles: Record<MapCategory, CategoryStyle> = {
  streetCollection: { kind: "zone", color: "#4F7A6C" },
  problemArea: { kind: "zone", color: "#B4553F" },
  requested: { kind: "dashedLine", color: "#F0AD6A" },
  pilot: { kind: "line", color: "#E8833A" },
  underground: { kind: "point", color: "#6F998C" },
  otherCollection: { kind: "point", color: "#8A938E" },
};

/** Order used in the filter list. */
export const filterOrder: MapCategory[] = [
  "pilot",
  "requested",
  "streetCollection",
  "underground",
  "otherCollection",
  "problemArea",
];

export const AMSTERDAM_CENTER = { longitude: 4.8945, latitude: 52.3655 };
/** [west, south, east, north] */
export const AMSTERDAM_BOUNDS: [number, number, number, number] = [4.68, 52.26, 5.1, 52.45];

export const BASEMAP_STYLE = "https://tiles.openfreemap.org/styles/positron";
