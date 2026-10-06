import { setWorkerUrl, type FilterSpecification, type MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { useMemo, useState } from "react";
import Map, {
  Layer,
  NavigationControl,
  Popup,
  Source,
  type LayerProps,
  type MapLayerMouseEvent,
  type MapEvent,
} from "react-map-gl/maplibre";
import {
  AMSTERDAM_BOUNDS,
  AMSTERDAM_CENTER,
  BASEMAP_STYLE,
  categoryStyles,
  type CategoryStyle,
} from "../../data/map/categories";
import type { MapCategory, MapFeatureCollection, MapFeatureProps } from "../../data/map/types";
import undergroundContainersUrl from "../../data/map/underground-containers.geojson?url";
import { useLanguage } from "../../i18n/useLanguage";

// maplibre-gl resolves its worker relative to its own module, which breaks once Vite bundles it.
setWorkerUrl(maplibreWorkerUrl);

const drawOrder = Object.keys(categoryStyles) as MapCategory[];

function layersFor(category: MapCategory, visible: boolean): LayerProps[] {
  const { kind, color } = categoryStyles[category];
  const filter: FilterSpecification = ["==", ["get", "category"], category];
  const layout = { visibility: visible ? "visible" : "none" } as const;
  switch (kind) {
    case "zone":
      return [
        { id: `${category}-fill`, type: "fill", filter, layout, paint: { "fill-color": color, "fill-opacity": category === "problemArea" ? 0.22 : 0.12 } },
        {
          id: `${category}-outline`,
          type: "line",
          filter,
          layout,
          paint: { "line-color": color, "line-width": 1.5, "line-opacity": 0.7, "line-dasharray": [2, 2] },
        },
      ];
    case "line":
      return [
        {
          id: `${category}-casing`,
          type: "line",
          filter,
          layout: { ...layout, "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#FFFFFF", "line-width": ["interpolate", ["linear"], ["zoom"], 11, 6, 16, 14] },
        },
        {
          id: `${category}-line`,
          type: "line",
          filter,
          layout: { ...layout, "line-cap": "round", "line-join": "round" },
          paint: { "line-color": color, "line-width": ["interpolate", ["linear"], ["zoom"], 11, 3.5, 16, 9] },
        },
      ];
    case "dashedLine":
      return [
        {
          id: `${category}-line`,
          type: "line",
          filter,
          layout: { ...layout, "line-cap": "butt", "line-join": "round" },
          paint: {
            "line-color": color,
            "line-width": ["interpolate", ["linear"], ["zoom"], 11, 2.5, 16, 6],
            "line-dasharray": [1.6, 1.2],
          },
        },
      ];
    case "point":
      if (category === "underground") {
        return [
          {
            id: `${category}-point`,
            type: "circle",
            filter,
            layout,
            paint: {
              "circle-color": color,
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 1.8, 13, 2.8, 16, 5.5],
              "circle-stroke-color": "#FFFFFF",
              "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 11, 0, 14, 0.6, 16, 1],
              "circle-opacity": ["interpolate", ["linear"], ["zoom"], 11, 0.48, 14, 0.62, 16, 0.68],
            },
          },
        ];
      }
      return [
        {
          id: `${category}-point`,
          type: "circle",
          filter,
          layout,
          paint: {
            "circle-color": color,
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 5, 16, 9],
            "circle-stroke-color": "#FFFFFF",
            "circle-stroke-width": 2,
          },
        },
      ];
  }
}

const PILOT_SOURCE = "pilot-data";
const CONTAINER_SOURCE = "underground-containers";

function sourceFor(category: MapCategory) {
  return category === "underground" ? CONTAINER_SOURCE : PILOT_SOURCE;
}

function clickableLayerId(category: MapCategory) {
  const { kind } = categoryStyles[category];
  if (kind === "zone") return `${category}-fill`;
  if (kind === "point") return `${category}-point`;
  return `${category}-line`;
}

const HIT_TOLERANCE = 8;

const kindPriority: Record<CategoryStyle["kind"], number> = { point: 3, line: 2, dashedLine: 2, zone: 1 };

/** Small targets (points, streets) win over the zones drawn beneath them. */
function clickPriority(feature: MapGeoJSONFeature) {
  const category = (feature.properties as MapFeatureProps).category;
  return kindPriority[categoryStyles[category].kind];
}

/** MapLibre enables compact attribution expanded (`open`) by default; keep icon-only until toggled. */
function collapseAttributionControl(map: MapEvent["target"]) {
  const el = map.getContainer().querySelector("details.maplibregl-ctrl-attrib");
  if (!el) return;
  el.removeAttribute("open");
}

function onMapLoad(e: MapEvent) {
  const map = e.target;
  for (const layer of map.getStyle().layers ?? []) {
    try {
      if (layer.type === "background") map.setPaintProperty(layer.id, "background-color", "#F3EFE6");
      else if (layer.type === "fill" && /water/.test(layer.id)) map.setPaintProperty(layer.id, "fill-color", "#CCDAD5");
      else if (layer.type === "fill" && /park|wood|grass|landcover|landuse/.test(layer.id))
        map.setPaintProperty(layer.id, "fill-color", "#E3E8DE");
      else if (layer.type === "fill" && /building/.test(layer.id)) map.setPaintProperty(layer.id, "fill-color", "#E8E2D6");
    } catch {
      // Base style changed upstream; tinting is cosmetic.
    }
  }
  collapseAttributionControl(map);
  map.once("idle", () => collapseAttributionControl(map));
}

type PopupState = { lng: number; lat: number; props: MapFeatureProps } | null;

type MapCanvasProps = {
  data: MapFeatureCollection;
  visible: Record<MapCategory, boolean>;
};

export default function MapCanvas({ data, visible }: MapCanvasProps) {
  const { t } = useLanguage();
  const [popup, setPopup] = useState<PopupState>(null);
  const [cursor, setCursor] = useState<string>("");

  const isSmall = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  const layers = useMemo(
    () => drawOrder.flatMap((c) => layersFor(c, visible[c]).map((layer) => ({ ...layer, source: sourceFor(c) }))),
    [visible],
  );
  const interactiveLayerIds = useMemo(
    () =>
      drawOrder
        .filter((c) => visible[c] && c !== "underground")
        .map(clickableLayerId)
        .reverse(),
    [visible],
  );

  const onClick = (e: MapLayerMouseEvent) => {
    const { x, y } = e.point;
    const hits = e.target.queryRenderedFeatures(
      [
        [x - HIT_TOLERANCE, y - HIT_TOLERANCE],
        [x + HIT_TOLERANCE, y + HIT_TOLERANCE],
      ],
      { layers: interactiveLayerIds },
    );
    const feature = hits.sort((a, b) => clickPriority(b) - clickPriority(a))[0];
    if (!feature) {
      setPopup(null);
      return;
    }
    setPopup({ lng: e.lngLat.lng, lat: e.lngLat.lat, props: feature.properties as MapFeatureProps });
  };

  const popupCategory = popup ? t.map.categories[popup.props.category] : null;
  const popupColor = popup ? categoryStyles[popup.props.category].color : undefined;

  return (
    <Map
      initialViewState={{ ...AMSTERDAM_CENTER, zoom: isSmall ? 11.4 : 12.4 }}
      minZoom={10.5}
      maxZoom={17}
      maxBounds={AMSTERDAM_BOUNDS}
      mapStyle={BASEMAP_STYLE}
      cooperativeGestures={isSmall}
      dragRotate={false}
      touchPitch={false}
      interactiveLayerIds={interactiveLayerIds}
      cursor={cursor}
      onMouseEnter={() => setCursor("pointer")}
      onMouseLeave={() => setCursor("")}
      onClick={onClick}
      onLoad={onMapLoad}
      attributionControl={{ compact: true }}
      style={{ width: "100%", height: "100%" }}
      aria-label={t.map.mapLabel}
    >
      <NavigationControl position="top-right" showCompass={false} />
      <Source id={PILOT_SOURCE} type="geojson" data={data} />
      <Source
        id={CONTAINER_SOURCE}
        type="geojson"
        data={undergroundContainersUrl}
        attribution="Containers © Gemeente Amsterdam"
      />
      {layers.map((layer) => (
        <Layer key={layer.id} {...layer} />
      ))}
      {popup && popupCategory && (
        <Popup longitude={popup.lng} latitude={popup.lat} onClose={() => setPopup(null)} closeOnClick={false} maxWidth="260px" offset={8}>
          <div className="pr-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone">
              <span className="size-2.5 rounded-full" style={{ background: popupColor }} />
              {popupCategory.label}
            </p>
            {popup.props.area && <p className="mt-1.5 text-base font-bold text-ink">{popup.props.area}</p>}
            <p className="mt-1 text-sm leading-snug text-ink-soft">{popupCategory.description}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
