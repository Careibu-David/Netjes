import type { Feature, FeatureCollection, LineString, Point, Polygon } from "geojson";

export const MAP_CATEGORIES = [
  "pilot",
  "requested",
  "streetCollection",
  "underground",
  "otherCollection",
  "problemArea",
] as const;

export type MapCategory = (typeof MAP_CATEGORIES)[number];

export type MapFeatureProps = {
  id: string;
  category: MapCategory;
  /** Neighbourhood or area name shown in the popup. */
  area?: string;
};

export type MapGeometry = LineString | Point | Polygon;
export type MapFeature = Feature<MapGeometry, MapFeatureProps>;
export type MapFeatureCollection = FeatureCollection<MapGeometry, MapFeatureProps>;
