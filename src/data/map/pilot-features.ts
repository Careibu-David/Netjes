import type { MapFeatureCollection } from "./types";

/**
 * Pilot layers (pilot streets, planned streets).
 * Underground containers are loaded separately from ./underground-containers.geojson.
 * Street geometry follows OpenStreetMap. The pilot runs on Nieuwe Achtergracht
 * between the Amstel and the Weesperstraat crossing; everything east of it is planned.
 */
export const pilotFeatures: MapFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "pilot-nieuwe-achtergracht-south",
        category: "pilot",
        area: "Nieuwe Achtergracht (zuid), Weesperbuurt",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.904838, 52.36181],
          [4.907417, 52.362297],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "pilot-nieuwe-achtergracht-north",
        category: "pilot",
        area: "Nieuwe Achtergracht (noord), Weesperbuurt",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.905192, 52.362186],
          [4.905235, 52.36218],
          [4.907107, 52.362538],
          [4.907258, 52.362567],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "requested-nieuwe-achtergracht-south",
        category: "requested",
        area: "Nieuwe Achtergracht (zuid, oost van de Weesperstraat)",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.907417, 52.362297],
          [4.907767, 52.362363],
          [4.907954, 52.36239],
          [4.910749, 52.362924],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "requested-nieuwe-achtergracht-north",
        category: "requested",
        area: "Nieuwe Achtergracht (noord, oost van de Weesperstraat)",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.907258, 52.362567],
          [4.9087, 52.362851],
          [4.91046, 52.363186],
          [4.910642, 52.363215],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: "requested-korte-amstelstraat", category: "requested", area: "Korte Amstelstraat, Weesperbuurt" },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.904098, 52.361669],
          [4.904839, 52.361808],
        ],
      },
    },
    {
      type: "Feature",
      properties: { id: "requested-onbekendegracht", category: "requested", area: "Onbekendegracht, Weesperbuurt" },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.905192, 52.362186],
          [4.905165, 52.362206],
          [4.904999, 52.362563],
          [4.904773, 52.363002],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "requested-nieuwe-prinsengracht-north",
        category: "requested",
        area: "Nieuwe Prinsengracht, Weesperbuurt",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.903373, 52.363091],
          [4.906356, 52.363628],
          [4.907788, 52.363896],
          [4.907858, 52.363903],
          [4.908346, 52.363995],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "requested-nieuwe-prinsengracht-south",
        category: "requested",
        area: "Nieuwe Prinsengracht, Weesperbuurt",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [4.903539, 52.362779],
          [4.906629, 52.36334],
          [4.90679, 52.363372],
          [4.908287, 52.363654],
          [4.910932, 52.364139],
        ],
      },
    },
  ],
};
