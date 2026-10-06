import { useEffect, useId, useRef, type RefObject } from "react";

type Variant = "protected" | "unprotected" | "clean";
type Framing = "wide" | "detail";

type Labels = { net: string; weights: string; bollard: string; bags: string };

type StreetSceneProps = {
  variant?: Variant;
  framing?: Framing;
  labels?: Labels;
  title: string;
  /** When the SVG is cropped by a CSS aspect ratio, keep the street level in view. */
  anchorBottom?: boolean;
  /** Loop gulls tearing the bags open and scattering litter (unprotected variant only). */
  animated?: boolean;
  className?: string;
};

const GROUND = 540;
const CURB = 640;

const viewBoxes: Record<Framing, string> = {
  wide: "0 20 1200 700",
  detail: "556 456 404 224",
};

const C = {
  sky: "#EEE9DE",
  trim: "#F4EFE5",
  glass: "#22302B",
  ink: "#1C1F1E",
  brand: "#3E2022",
  sidewalk: "#DCD3C3",
  sidewalkLine: "#C8BDA9",
  curb: "#A39A8B",
  road: "#B26E58",
  roadLine: "#985846",
  net: "#E8833A",
  netDark: "#C96A24",
  leaf: "#4F7A6C",
  leafDark: "#2C5246",
};

type Gable = "step" | "bell" | "neck" | "cornice";
type House = { x: number; w: number; h: number; gable: Gable; fill: string; door: string };

const houses: House[] = [
  { x: -20, w: 200, h: 380, gable: "step", fill: "#A64B37", door: "#3E2022" },
  { x: 180, w: 170, h: 415, gable: "bell", fill: "#E3D8C6", door: "#2C5246" },
  { x: 350, w: 210, h: 360, gable: "cornice", fill: "#33403B", door: "#8E3F2F" },
  { x: 560, w: 180, h: 420, gable: "neck", fill: "#C26A50", door: "#3E2022" },
  { x: 740, w: 200, h: 385, gable: "step", fill: "#8E3F2F", door: "#1C1F1E" },
  { x: 940, w: 170, h: 410, gable: "bell", fill: "#D9C9AE", door: "#3E2022" },
  { x: 1110, w: 120, h: 370, gable: "cornice", fill: "#2C5246", door: "#1C1F1E" },
];

function gableHeight(g: Gable) {
  return g === "cornice" ? 26 : 100;
}

function facadePath({ x, w, h, gable }: House) {
  const t = GROUND - h;
  const g = gableHeight(gable);
  const G = GROUND;
  switch (gable) {
    case "step": {
      const s = w * 0.11;
      const dy = g / 4;
      const left: [number, number][] = [
        [x, G],
        [x, t + g],
      ];
      for (let i = 1; i <= 3; i++) {
        left.push([x + i * s, t + g - (i - 1) * dy]);
        left.push([x + i * s, t + g - i * dy]);
      }
      left.push([x + 3 * s, t]);
      const right = [...left].reverse().map(([px, py]) => [2 * x + w - px, py] as [number, number]);
      return `M${[...left, ...right].map(([a, b]) => `${a},${b}`).join(" L")} Z`;
    }
    case "bell":
      return `M${x},${G} L${x},${t + g} L${x + 0.1 * w},${t + g}
        C${x + 0.25 * w},${t + g} ${x + 0.25 * w},${t + g * 0.45} ${x + 0.34 * w},${t + g * 0.32}
        L${x + 0.34 * w},${t + g * 0.14} Q${x + 0.5 * w},${t - 12} ${x + 0.66 * w},${t + g * 0.14}
        L${x + 0.66 * w},${t + g * 0.32} C${x + 0.75 * w},${t + g * 0.45} ${x + 0.75 * w},${t + g} ${x + 0.9 * w},${t + g}
        L${x + w},${t + g} L${x + w},${G} Z`;
    case "neck":
      return `M${x},${G} L${x},${t + g} L${x + 0.16 * w},${t + g}
        Q${x + 0.3 * w},${t + g} ${x + 0.3 * w},${t + g * 0.5} L${x + 0.3 * w},${t + g * 0.24}
        L${x + 0.5 * w},${t} L${x + 0.7 * w},${t + g * 0.24} L${x + 0.7 * w},${t + g * 0.5}
        Q${x + 0.7 * w},${t + g} ${x + 0.84 * w},${t + g} L${x + w},${t + g} L${x + w},${G} Z`;
    case "cornice":
      return `M${x},${G} L${x},${t} L${x + w},${t} L${x + w},${G} Z`;
  }
}

function Window({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={C.trim} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} fill={C.glass} />
      <path d={`M${x + w / 2} ${y + 3} V${y + h - 3} M${x + 3} ${y + h * 0.42} H${x + w - 3}`} stroke={C.trim} strokeWidth={2} />
    </g>
  );
}

function HouseShape({ house }: { house: House }) {
  const { x, w, h, gable, fill, door } = house;
  const t = GROUND - h;
  const g = gableHeight(gable);
  const bodyTop = t + g;
  const cols = w >= 180 ? 3 : 2;
  const ww = cols === 3 ? w * 0.16 : w * 0.21;
  const wh = 56;
  const groundFloor = GROUND - 132;
  const rows = Math.max(1, Math.floor((groundFloor - (bodyTop + 22)) / 78));
  const windows = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + (w * (c + 1)) / (cols + 1);
      windows.push(<Window key={`${r}-${c}`} x={cx - ww / 2} y={bodyTop + 22 + r * 78} w={ww} h={wh} />);
    }
  }
  const doorW = Math.max(30, w * 0.2);
  const doorX = x + w * 0.66;
  return (
    <g>
      <path d={facadePath(house)} fill={fill} />
      {gable === "cornice" ? (
        <rect x={x - 4} y={t} width={w + 8} height={12} fill={C.trim} />
      ) : (
        <>
          <rect x={x} y={bodyTop - 3} width={w} height={5} fill={C.trim} opacity={0.85} />
          <Window x={x + w / 2 - 13} y={t + g * 0.42} w={26} h={34} />
          <rect x={x + w / 2 - 2} y={t + g * 0.2} width={4} height={14} fill={C.ink} opacity={0.7} />
        </>
      )}
      {windows}
      <rect x={x} y={groundFloor - 6} width={w} height={4} fill={C.trim} opacity={0.6} />
      <Window x={x + w * 0.1} y={GROUND - 116} w={w * 0.44} h={84} />
      <rect x={doorX} y={GROUND - 128} width={doorW} height={18} rx={2} fill={C.trim} />
      <rect x={doorX + 3} y={GROUND - 125} width={doorW - 6} height={12} fill={C.glass} />
      <rect x={doorX} y={GROUND - 106} width={doorW} height={100} fill={door} />
      <rect x={doorX + 5} y={GROUND - 98} width={doorW - 10} height={36} fill="none" stroke={C.trim} strokeOpacity={0.35} strokeWidth={1.5} />
      <circle cx={doorX + doorW - 7} cy={GROUND - 52} r={2} fill={C.trim} />
      <rect x={doorX - 6} y={GROUND - 6} width={doorW + 12} height={6} fill="#B9AE9C" />
    </g>
  );
}

function Bollard({ cx, base = CURB }: { cx: number; base?: number }) {
  return (
    <g>
      <ellipse cx={cx + 4} cy={base} rx={15} ry={3} fill={C.ink} opacity={0.15} />
      <path
        d={`M${cx - 11} ${base} L${cx - 9} ${base - 56} L${cx - 11} ${base - 58} L${cx - 11} ${base - 63} L${cx - 7} ${base - 65}
          Q${cx - 8} ${base - 76} ${cx} ${base - 77} Q${cx + 8} ${base - 76} ${cx + 7} ${base - 65}
          L${cx + 11} ${base - 63} L${cx + 11} ${base - 58} L${cx + 9} ${base - 56} L${cx + 11} ${base} Z`}
        fill={C.brand}
      />
      {[46, 34, 22].map((dy) => (
        <path
          key={dy}
          d={`M${cx - 3.5} ${base - dy - 3.5} L${cx + 3.5} ${base - dy + 3.5} M${cx + 3.5} ${base - dy - 3.5} L${cx - 3.5} ${base - dy + 3.5}`}
          stroke={C.trim}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      ))}
      <path d={`M${cx - 6} ${base - 6} L${cx - 5} ${base - 54}`} stroke="#fff" strokeOpacity={0.12} strokeWidth={2} />
    </g>
  );
}

function Bicycle({ x }: { x: number }) {
  const y = 598;
  const r = 36;
  const rear = x;
  const front = x + 122;
  const bb = x + 52;
  const stroke = { stroke: C.ink, strokeWidth: 4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <g>
      <ellipse cx={x + 60} cy={y + r + 1} rx={95} ry={4} fill={C.ink} opacity={0.12} />
      {[rear, front].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={y} r={r} fill="none" stroke={C.ink} strokeWidth={4} />
          <circle cx={cx} cy={y} r={r - 7} fill="none" stroke={C.ink} strokeOpacity={0.25} strokeWidth={1} />
          <circle cx={cx} cy={y} r={3} fill={C.ink} />
        </g>
      ))}
      <path d={`M${rear - 30} ${y - 22} A${r + 4} ${r + 4} 0 0 1 ${rear + 22} ${y - 30}`} {...stroke} stroke={C.brand} strokeWidth={5} />
      <path d={`M${front - 24} ${y - 30} A${r + 4} ${r + 4} 0 0 1 ${front + 30} ${y - 20}`} {...stroke} stroke={C.brand} strokeWidth={5} />
      <g {...stroke} stroke={C.brand} strokeWidth={5}>
        <path d={`M${rear} ${y} L${bb} ${y + 2}`} />
        <path d={`M${rear} ${y} L${x + 34} ${y - 52}`} />
        <path d={`M${bb} ${y + 2} L${x + 34} ${y - 58}`} />
        <path d={`M${bb} ${y + 2} C${x + 74} ${y - 10} ${x + 92} ${y - 40} ${x + 108} ${y - 54}`} />
        <path d={`M${x + 106} ${y - 60} L${front} ${y}`} />
      </g>
      <path d={`M${x + 104} ${y - 62} L${x + 100} ${y - 76} Q${x + 96} ${y - 82} ${x + 82} ${y - 80}`} {...stroke} strokeWidth={3.5} />
      <path d={`M${x + 22} ${y - 62} Q${x + 34} ${y - 68} ${x + 46} ${y - 62}`} {...stroke} strokeWidth={7} />
      <path d={`M${rear - 26} ${y - 40} L${x + 26} ${y - 40} M${rear - 18} ${y - 40} L${rear} ${y}`} {...stroke} strokeWidth={3} />
      <circle cx={bb} cy={y + 2} r={6} fill="none" stroke={C.ink} strokeWidth={2.5} />
    </g>
  );
}

function Bag({ cx, base, w, h, fill }: { cx: number; base: number; w: number; h: number; fill: string }) {
  const top = base - h;
  return (
    <g>
      <path
        d={`M${cx - w / 2} ${base}
          C${cx - w / 2 - 8} ${base - h * 0.55} ${cx - w * 0.28} ${top + 2} ${cx - 7} ${top}
          L${cx - 13} ${top - 13} Q${cx - 4} ${top - 9} ${cx} ${top - 4} Q${cx + 4} ${top - 9} ${cx + 13} ${top - 13}
          L${cx + 7} ${top} C${cx + w * 0.28} ${top + 2} ${cx + w / 2 + 8} ${base - h * 0.55} ${cx + w / 2} ${base} Z`}
        fill={fill}
      />
      <path
        d={`M${cx - w * 0.28} ${base - h * 0.25} Q${cx - w * 0.32} ${base - h * 0.62} ${cx - w * 0.12} ${top + h * 0.18}`}
        stroke="#fff"
        strokeOpacity={0.16}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <path d={`M${cx - 6} ${top + 4} Q${cx} ${top + 10} ${cx + 6} ${top + 4}`} stroke="#000" strokeOpacity={0.3} strokeWidth={1.5} fill="none" />
    </g>
  );
}

function Gull({ x, y, flip = false, pecking = false, s = 1 }: { x: number; y: number; flip?: boolean; pecking?: boolean; s?: number }) {
  const headY = pecking ? -10 : -24;
  const headX = pecking ? 18 : 13;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-2 -7 L-3 0 M3 -7 L4 0" stroke="#D9A23A" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M-14 -13 L-26 -9 L-14 -8 Z" fill={C.ink} />
      <ellipse cx={0} cy={-14} rx={16} ry={9} fill="#FFFFFF" stroke="#CFC8BA" strokeWidth={1} />
      <path d={`M${headX - 8} ${headY + 6} Q${headX - 4} ${headY} ${headX} ${headY}`} stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" fill="none" />
      <circle cx={headX} cy={headY} r={6.5} fill="#FFFFFF" stroke="#CFC8BA" strokeWidth={1} />
      <path d={`M${headX + 5} ${headY - 1} L${headX + 14} ${headY + 1.5} L${headX + 5} ${headY + 3} Z`} fill="#E8B83A" />
      <circle cx={headX + 2} cy={headY - 1.5} r={1.2} fill={C.ink} />
      <path d="M-13 -18 Q0 -25 11 -17 Q0 -10 -15 -12 Z" fill="#9AA29E" />
      <path d="M-15 -12 L-24 -11 L-13 -16 Z" fill={C.ink} />
    </g>
  );
}

function FlyingGull({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-24 2 Q-12 -10 0 2 Q12 -10 24 2" fill="none" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx={0} cy={3} rx={4} ry={2.4} fill="#FFFFFF" stroke={C.ink} strokeWidth={1} />
    </g>
  );
}

function Tree({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 26} y={CURB - 10} width={52} height={8} rx={2} fill="#9C8F7A" opacity={0.6} />
      <path d={`M${x - 6} ${CURB - 6} L${x - 4} ${430} L${x - 30} ${380} M${x + 6} ${CURB - 6} L${x + 3} ${420} L${x + 34} ${370} M${x} ${440} L${x + 2} ${330}`} stroke="#4A3F35" strokeWidth={9} strokeLinecap="round" fill="none" />
      <g fill={C.leaf}>
        <circle cx={x - 50} cy={360} r={58} />
        <circle cx={x + 20} cy={318} r={70} />
        <circle cx={x + 74} cy={372} r={52} />
        <circle cx={x - 8} cy={392} r={50} />
      </g>
      <g fill={C.leafDark} opacity={0.55}>
        <circle cx={x + 40} cy={392} r={40} />
        <circle cx={x - 62} cy={388} r={34} />
      </g>
    </g>
  );
}

const litter: { kind: "paper" | "can" | "scrap" | "bottle"; x: number; y: number; r: number }[] = [
  { kind: "paper", x: 612, y: 650, r: -20 },
  { kind: "can", x: 650, y: 690, r: 60 },
  { kind: "scrap", x: 676, y: 648, r: 10 },
  { kind: "paper", x: 700, y: 714, r: 30 },
  { kind: "bottle", x: 728, y: 664, r: -70 },
  { kind: "paper", x: 760, y: 690, r: 12 },
  { kind: "scrap", x: 792, y: 650, r: -40 },
  { kind: "can", x: 820, y: 726, r: -15 },
  { kind: "paper", x: 852, y: 660, r: 50 },
  { kind: "scrap", x: 884, y: 706, r: 20 },
  { kind: "paper", x: 918, y: 652, r: -35 },
  { kind: "can", x: 944, y: 690, r: 80 },
  { kind: "paper", x: 990, y: 734, r: 15 },
  { kind: "scrap", x: 1020, y: 668, r: -10 },
  { kind: "paper", x: 1070, y: 702, r: 40 },
  { kind: "scrap", x: 560, y: 704, r: 25 },
  { kind: "paper", x: 520, y: 660, r: -25 },
  { kind: "can", x: 474, y: 724, r: 30 },
  { kind: "scrap", x: 880, y: 616, r: 0 },
  { kind: "paper", x: 650, y: 608, r: 18 },
  { kind: "bottle", x: 1110, y: 660, r: 20 },
  { kind: "paper", x: 1150, y: 708, r: -15 },
  { kind: "paper", x: 922, y: 622, r: 25 },
  { kind: "can", x: 948, y: 606, r: -30 },
  { kind: "scrap", x: 980, y: 626, r: 15 },
  { kind: "paper", x: 1004, y: 596, r: -10 },
  { kind: "bottle", x: 900, y: 586, r: 10 },
  { kind: "paper", x: 640, y: 584, r: -30 },
  { kind: "scrap", x: 620, y: 620, r: 40 },
  { kind: "can", x: 560, y: 610, r: 15 },
  { kind: "paper", x: 530, y: 590, r: 20 },
  { kind: "scrap", x: 1080, y: 612, r: -20 },
  { kind: "paper", x: 470, y: 624, r: -12 },
];

function LitterPiece({ kind, i }: { kind: (typeof litter)[number]["kind"]; i: number }) {
  return (
    <>
      {kind === "paper" && <path d="M-10 -6 L8 -8 L11 4 L-6 8 Z" fill="#FBF9F4" stroke="#BDB3A2" strokeWidth={1} />}
      {kind === "can" && (
        <g>
          <rect x={-8} y={-4} width={16} height={8} rx={2} fill={i % 2 ? "#B4553F" : "#C9D3CC"} />
          <rect x={6} y={-4} width={2.5} height={8} fill="#8A938E" />
        </g>
      )}
      {kind === "scrap" && <path d="M-6 -3 Q0 -8 6 -2 Q2 4 -5 3 Z" fill="#E8B83A" opacity={0.9} />}
      {kind === "bottle" && (
        <g>
          <rect x={-12} y={-4} width={18} height={8} rx={3} fill="#4F7A6C" opacity={0.85} />
          <rect x={6} y={-2} width={6} height={4} rx={1} fill="#4F7A6C" opacity={0.85} />
        </g>
      )}
    </>
  );
}

const bags = [
  { cx: 690, base: 634, w: 80, h: 70, fill: "#2B2F2D" },
  { cx: 832, base: 634, w: 72, h: 60, fill: "#24282A" },
  { cx: 762, base: 636, w: 92, h: 84, fill: "#3A403D" },
  { cx: 732, base: 584, w: 68, h: 54, fill: "#30353A" },
  { cx: 806, base: 594, w: 58, h: 48, fill: "#7C8580" },
];

const NET_PATH =
  "M640 636 C636 596 652 566 684 552 C694 520 716 500 742 498 C768 497 786 516 792 534 C814 530 846 544 862 586 C870 606 874 622 876 636 Z";

function Net({ meshId }: { meshId: string }) {
  const beads = [];
  for (let bx = 644; bx <= 872; bx += 19) beads.push(bx);
  return (
    <g>
      <path d={NET_PATH} fill={C.net} fillOpacity={0.1} />
      <path d={NET_PATH} fill={`url(#${meshId})`} />
      <path d={NET_PATH} fill="none" stroke={C.net} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M636 637 L880 637" stroke={C.netDark} strokeWidth={6} strokeLinecap="round" />
      {beads.map((bx) => (
        <circle key={bx} cx={bx} cy={637} r={5} fill={C.brand} stroke={C.netDark} strokeWidth={1.5} />
      ))}
      <path d="M644 606 Q626 596 612 579" stroke={C.netDark} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <circle cx={608} cy={577} r={3.5} fill="none" stroke={C.netDark} strokeWidth={2} />
    </g>
  );
}

function TornBits() {
  return (
    <>
      <path d="M738 600 L748 586 L756 598 L766 582 L776 596 L786 588 L790 612 L770 624 L744 620 Z" fill="#E7DFCF" />
      <path d="M744 604 L752 614 L762 604 L772 616 L782 604" stroke="#BDB3A2" strokeWidth={1.5} fill="none" />
      <path d="M842 634 C838 616 852 604 878 606 C900 608 912 620 908 634 Z" fill="#7C8580" />
      <path d="M870 607 L878 616 L886 606 L894 618 L902 612 L906 630 L874 630 Z" fill="#E7DFCF" />
    </>
  );
}

/* Clean street: no bags, no gulls — planters, bunting and happy neighbours. */

type PersonProps = {
  x: number;
  base?: number;
  s?: number;
  flip?: boolean;
  wave?: boolean;
  shirt: string;
  pants: string;
  skin: string;
  hair: string;
};

function Person({ x, base = 632, s = 1, flip = false, wave = false, shirt, pants, skin, hair }: PersonProps) {
  const arm = { stroke: shirt, strokeWidth: 7, strokeLinecap: "round" as const, fill: "none" };
  return (
    <g transform={`translate(${x} ${base}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={1} rx={22} ry={3.5} fill={C.ink} opacity={0.12} />
      <path d="M-7 -48 L-9 -2 M7 -48 L9 -2" stroke={pants} strokeWidth={9} strokeLinecap="round" />
      <ellipse cx={-11} cy={0} rx={7} ry={3.2} fill={C.ink} />
      <ellipse cx={11} cy={0} rx={7} ry={3.2} fill={C.ink} />
      <path d="M-16 -48 Q-18 -92 0 -94 Q18 -92 16 -48 Z" fill={shirt} />
      <path d="M-14 -86 Q-22 -68 -20 -52" {...arm} />
      <circle cx={-20} cy={-49} r={4} fill={skin} />
      {wave ? (
        <>
          <path d="M14 -86 Q28 -98 30 -116" {...arm} />
          <circle cx={30} cy={-120} r={4.5} fill={skin} />
        </>
      ) : (
        <>
          <path d="M14 -86 Q22 -68 20 -52" {...arm} />
          <circle cx={20} cy={-49} r={4} fill={skin} />
        </>
      )}
      <rect x={-4} y={-100} width={8} height={8} rx={3} fill={skin} />
      <circle cx={0} cy={-110} r={13} fill={skin} />
      <path d="M-13.5 -111 Q-13 -126 0 -125 Q13 -126 13.5 -111 Q6 -119 -13.5 -111 Z" fill={hair} />
      <circle cx={-4.5} cy={-110} r={1.5} fill={C.ink} />
      <circle cx={4.5} cy={-110} r={1.5} fill={C.ink} />
      <circle cx={-8.5} cy={-105} r={2.6} fill="#E8826E" opacity={0.45} />
      <circle cx={8.5} cy={-105} r={2.6} fill="#E8826E" opacity={0.45} />
      <path d="M-5 -104.5 Q0 -99 5 -104.5" stroke={C.ink} strokeWidth={1.7} strokeLinecap="round" fill="none" />
    </g>
  );
}

const flowerColors = ["#E8833A", "#E86A8A", "#F2C94C", "#FBF9F4", "#C26A9E"];

function Planter({ x, w = 76 }: { x: number; w?: number }) {
  const flowers = [];
  for (let i = 0; i < Math.floor(w / 13); i++) {
    const fx = x - w / 2 + 8 + i * 13;
    const fy = 596 - (i % 2) * 8;
    flowers.push({ fx, fy, color: flowerColors[i % flowerColors.length] });
  }
  return (
    <g>
      <ellipse cx={x + 4} cy={CURB - 2} rx={w / 2 + 6} ry={3.5} fill={C.ink} opacity={0.12} />
      <g fill={C.leaf}>
        {flowers.map(({ fx, fy }) => (
          <ellipse key={fx} cx={fx} cy={fy + 10} rx={9} ry={12} />
        ))}
      </g>
      {flowers.map(({ fx, fy, color }) => (
        <g key={fx}>
          <circle cx={fx} cy={fy} r={6} fill={color} />
          <circle cx={fx} cy={fy} r={2.2} fill="#F2C94C" />
        </g>
      ))}
      <path d={`M${x - w / 2} 612 L${x + w / 2} 612 L${x + w / 2 - 6} ${CURB - 2} L${x - w / 2 + 6} ${CURB - 2} Z`} fill="#7A5A44" />
      <rect x={x - w / 2 - 2} y={608} width={w + 4} height={7} rx={2} fill="#8E6B52" />
    </g>
  );
}

function Bunting() {
  const p0 = { x: -20, y: 250 };
  const p1 = { x: 600, y: 330 };
  const p2 = { x: 1220, y: 250 };
  const colors = [C.net, "#3E2022", C.trim, "#4F7A6C", "#E86A8A"];
  const flags = [];
  for (let i = 1; i < 30; i++) {
    const t = i / 30;
    const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
    const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
    flags.push({ x, y, color: colors[i % colors.length] });
  }
  return (
    <g>
      <path d={`M${p0.x} ${p0.y} Q${p1.x} ${p1.y} ${p2.x} ${p2.y}`} stroke={C.ink} strokeOpacity={0.5} strokeWidth={1.5} fill="none" />
      {flags.map(({ x, y, color }) => (
        <path key={x} d={`M${x - 10} ${y} L${x + 10} ${y} L${x} ${y + 22} Z`} fill={color} />
      ))}
    </g>
  );
}

function Sparkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -9 L2.2 -2.2 L9 0 L2.2 2.2 L0 9 L-2.2 2.2 L-9 0 L-2.2 -2.2 Z"
      fill="#FFFFFF"
      opacity={0.85}
    />
  );
}

function CleanStreet() {
  return (
    <g>
      <Planter x={84} />
      <Planter x={480} w={64} />
      <Planter x={1100} w={60} />
      <Person x={560} wave shirt="#E8833A" pants="#3E2022" skin="#A86F4C" hair="#2B1D16" />
      <Person x={742} shirt="#4F7A6C" pants="#2B2F2D" skin="#F2CDAE" hair="#8A5A2B" />
      <Person x={786} s={0.66} shirt="#F2C94C" pants="#3D6B5E" skin="#F2CDAE" hair="#8A5A2B" wave />
      <Person x={900} flip shirt="#C26A9E" pants="#24282A" skin="#6B4430" hair="#1C1F1E" />
      {[
        [300, 700, 1],
        [640, 690, 0.8],
        [990, 716, 1.1],
        [170, 726, 0.7],
        [830, 734, 0.9],
        [1120, 686, 0.75],
        [430, 728, 0.8],
      ].map(([x, y, s]) => (
        <Sparkle key={x} x={x} y={y} s={s} />
      ))}
    </g>
  );
}

/* Unprotected street: torn bag piles by several Amsterdammertjes, gulls scattering the litter.
   Static markup is the final (messy) frame; the animation loops the litter flying out of the bags. */

const LOOP_MS = 12000;

const sidePiles = [
  {
    origin: { x: 95, y: 604 },
    bags: [
      { cx: 72, base: 636, w: 60, h: 56, fill: "#2B2F2D" },
      { cx: 116, base: 638, w: 52, h: 46, fill: "#3A403D" },
    ],
    torn: "M58 604 L66 594 L74 604 L82 592 L90 602 L92 616 L62 618 Z",
  },
  {
    origin: { x: 478, y: 606 },
    bags: [
      { cx: 452, base: 636, w: 62, h: 58, fill: "#24282A" },
      { cx: 504, base: 638, w: 52, h: 44, fill: "#7C8580" },
    ],
    torn: "M438 602 L446 590 L454 600 L462 588 L470 600 L470 614 L440 616 Z",
  },
  {
    origin: { x: 1102, y: 606 },
    bags: [
      { cx: 1090, base: 636, w: 56, h: 52, fill: "#30353A" },
      { cx: 1124, base: 638, w: 40, h: 36, fill: "#2B2F2D" },
    ],
    torn: "M1076 606 L1084 596 L1092 606 L1100 594 L1106 606 L1104 618 L1078 618 Z",
  },
];

const pileOrigins = [{ x: 770, y: 600 }, ...sidePiles.map((p) => p.origin)];

const extraLitter: typeof litter = [
  { kind: "paper", x: 40, y: 662, r: 20 },
  { kind: "can", x: 128, y: 700, r: -40 },
  { kind: "scrap", x: 70, y: 720, r: 10 },
  { kind: "paper", x: 180, y: 676, r: -15 },
  { kind: "bottle", x: 20, y: 700, r: 70 },
  { kind: "scrap", x: 196, y: 726, r: 30 },
  { kind: "paper", x: 420, y: 700, r: 35 },
  { kind: "scrap", x: 404, y: 668, r: -20 },
  { kind: "paper", x: 1176, y: 660, r: 10 },
  { kind: "can", x: 1130, y: 740, r: 25 },
];

/** Every litter piece flies out of the nearest pile, nearest pieces first. */
const scatterLitter = (() => {
  const all = [...litter, ...extraLitter].map((p) => {
    let origin = pileOrigins[0];
    for (const o of pileOrigins) {
      if (Math.hypot(p.x - o.x, p.y - o.y) < Math.hypot(p.x - origin.x, p.y - origin.y)) origin = o;
    }
    return { ...p, origin, d: Math.hypot(p.x - origin.x, p.y - origin.y), start: 0 };
  });
  for (const o of pileOrigins) {
    const group = all.filter((p) => p.origin === o).sort((a, b) => a.d - b.d);
    group.forEach((p, rank) => {
      p.start = 0.04 + (rank / Math.max(group.length, 1)) * 0.6;
    });
  }
  return all;
})();

const scatterGulls = [
  { x: 760, y: 598, flip: false, s: 1.35 },
  { x: 930, y: 700, flip: true, s: 1.35 },
  { x: 1060, y: 640, flip: false, s: 1.15 },
  { x: 158, y: 648, flip: true, s: 1.15 },
  { x: 560, y: 668, flip: false, s: 1.1 },
];

const pivotStyle = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;

function ScatterMess() {
  return (
    <g>
      {bags.slice(0, 3).map((b, i) => (
        <Bag key={i} {...b} />
      ))}
      <TornBits />
      {sidePiles.map((pile) => (
        <g key={pile.origin.x}>
          {pile.bags.map((b) => (
            <Bag key={b.cx} {...b} />
          ))}
          <path d={pile.torn} fill="#E7DFCF" />
        </g>
      ))}

      {scatterLitter.map(({ kind, x, y, r, origin, start }, i) => (
        <g key={i} data-litter data-dx={origin.x - x} data-dy={origin.y - y} data-start={start}>
          <g transform={`translate(${x} ${y}) rotate(${r})`}>
            <LitterPiece kind={kind} i={i} />
          </g>
        </g>
      ))}

      {scatterGulls.map((g) => (
        <g key={g.x} data-peck={g.flip ? -1 : 1} style={pivotStyle}>
          <Gull x={g.x} y={g.y} flip={g.flip} pecking s={g.s} />
        </g>
      ))}
    </g>
  );
}

function buildScatterAnimations(svg: SVGSVGElement): Animation[] {
  const loop: KeyframeAnimationOptions = { duration: LOOP_MS, iterations: Infinity };
  const t = (x: number, y: number) => `translate(${x}px, ${y}px)`;
  const anims: Animation[] = [];

  svg.querySelectorAll<SVGGElement>("[data-litter]").forEach((el) => {
    const dx = Number(el.dataset.dx);
    const dy = Number(el.dataset.dy);
    const s = Number(el.dataset.start);
    anims.push(
      el.animate(
        [
          { offset: 0, opacity: 0, transform: t(dx, dy) },
          { offset: s, opacity: 0, transform: t(dx, dy), easing: "ease-out" },
          { offset: s + 0.03, opacity: 1, transform: t(dx * 0.45, dy * 0.45 - 70), easing: "ease-in" },
          { offset: s + 0.06, opacity: 1, transform: t(0, 0) },
          { offset: 0.88, opacity: 1, transform: t(0, 0) },
          { offset: 0.96, opacity: 0, transform: t(0, 0) },
          { offset: 1, opacity: 0, transform: t(dx, dy) },
        ],
        loop,
      ),
    );
  });

  svg.querySelectorAll<SVGGElement>("[data-peck]").forEach((el, i) => {
    const dir = Number(el.dataset.peck);
    anims.push(
      el.animate(
        [
          { transform: "rotate(0deg)" },
          { offset: 0.35, transform: `rotate(${dir * 12}deg)` },
          { offset: 0.55, transform: `rotate(${dir * 12}deg)` },
          { transform: "rotate(0deg)" },
        ],
        { duration: 900, iterations: Infinity, delay: i * 350, easing: "ease-in-out" },
      ),
    );
  });

  return anims;
}

function useScatterAnimation(svgRef: RefObject<SVGSVGElement | null>, enabled: boolean) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!enabled || !svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let anims: Animation[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (anims.length === 0) anims = buildScatterAnimations(svg);
          else anims.forEach((a) => a.play());
        } else {
          anims.forEach((a) => a.pause());
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(svg);
    return () => {
      observer.disconnect();
      anims.forEach((a) => a.cancel());
    };
  }, [svgRef, enabled]);
}

function Callout({ x, y, text, toX, toY, anchor = "start" }: { x: number; y: number; text: string; toX: number; toY: number; anchor?: "start" | "end" }) {
  const width = text.length * 6.6 + 18;
  const left = anchor === "start" ? x : x - width;
  return (
    <g>
      <path d={`M${anchor === "start" ? left + 8 : left + width - 8} ${y + 11} L${toX} ${toY}`} stroke={C.ink} strokeWidth={1} />
      <circle cx={toX} cy={toY} r={2.5} fill={C.ink} />
      <rect x={left} y={y} width={width} height={22} rx={11} fill="#FBF9F4" stroke="#E2DDD2" />
      <text x={left + width / 2} y={y + 15} textAnchor="middle" fontSize={11.5} fontWeight={600} fill={C.ink}>
        {text}
      </text>
    </g>
  );
}

export function StreetScene({
  variant = "protected",
  framing = "wide",
  labels,
  title,
  anchorBottom = false,
  animated = false,
  className = "",
}: StreetSceneProps) {
  const uid = useId().replace(/:/g, "");
  const ids = { mesh: `mesh-${uid}`, tiles: `tiles-${uid}`, bricks: `bricks-${uid}` };
  const isProtected = variant === "protected";
  const isClean = variant === "clean";
  const isAnimated = animated && variant === "unprotected";
  const svgRef = useRef<SVGSVGElement>(null);
  useScatterAnimation(svgRef, isAnimated);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBoxes[framing]}
      role="img"
      aria-label={title}
      className={`block w-full ${className || "h-auto"}`}
      preserveAspectRatio={anchorBottom ? "xMidYMax slice" : "xMidYMid slice"}
    >
      <title>{title}</title>
      <defs>
        <pattern id={ids.mesh} width={13} height={13} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V13 M0 0 H13" stroke={C.net} strokeWidth={1.5} />
        </pattern>
        <pattern id={ids.tiles} width={60} height={20} patternUnits="userSpaceOnUse">
          <rect width={60} height={20} fill={C.sidewalk} />
          <path d="M0 0 H60 M0 10 H60 M15 0 V10 M45 0 V10 M0 10 V20 M30 10 V20" stroke={C.sidewalkLine} strokeWidth={1} />
        </pattern>
        <pattern id={ids.bricks} width={24} height={24} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={24} height={24} fill={C.road} />
          <path d="M0 0 H12 V24 M12 12 H24 M0 0 V12 H12 M12 0 H24 V12" stroke={C.roadLine} strokeWidth={1.2} fill="none" />
        </pattern>
      </defs>

      <rect x={0} y={0} width={1200} height={760} fill={C.sky} />
      {!isClean && (
        <>
          <FlyingGull x={430} y={70} />
          <FlyingGull x={492} y={46} s={0.7} />
        </>
      )}
      {variant === "unprotected" && <FlyingGull x={900} y={84} s={0.85} />}

      {houses.map((h) => (
        <HouseShape key={h.x} house={h} />
      ))}

      <rect x={0} y={GROUND} width={1200} height={CURB - GROUND} fill={`url(#${ids.tiles})`} />
      <rect x={0} y={GROUND} width={1200} height={3} fill="#000" opacity={0.08} />
      <rect x={0} y={CURB} width={1200} height={9} fill={C.curb} />
      <rect x={0} y={CURB + 9} width={1200} height={760 - CURB - 9} fill={`url(#${ids.bricks})`} />

      {isClean && <Bunting />}
      <Tree x={1030} />
      {!isClean && <Gull x={470} y={GROUND - 360} flip />}

      {[150, 410, 605, 960, 1150].map((cx) => (
        <Bollard key={cx} cx={cx} />
      ))}
      <Bicycle x={240} />

      {isProtected ? (
        <>
          {bags.map((b, i) => (
            <Bag key={i} {...b} />
          ))}
          <Net meshId={ids.mesh} />
        </>
      ) : isClean ? (
        <CleanStreet />
      ) : (
        <ScatterMess />
      )}

      {labels && framing === "detail" && (
        <g>
          <Callout x={950} y={470} text={labels.net} toX={836} toY={556} anchor="end" />
          <Callout x={950} y={648} text={labels.weights} toX={872} toY={637} anchor="end" />
          <Callout x={566} y={470} text={labels.bollard} toX={605} toY={566} />
          <Callout x={566} y={648} text={labels.bags} toX={700} toY={604} />
        </g>
      )}
    </svg>
  );
}
