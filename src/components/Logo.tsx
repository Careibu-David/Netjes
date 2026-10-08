import { useId } from "react";
import { site } from "../config/site";
import { STEP_ICON_BAG_PATH } from "./illustrations/StepIcon";

const NET_OUTLINE =
  "M4 4 Q24 10 44 4 Q38 24 44 44 Q24 38 4 44 Q10 24 4 4 Z";

const MESH_OFFSETS = Array.from({ length: 17 }, (_, i) => i * 6 - 48);

/** Places the 32×32 step-icon bag in the middle of the net. */
const BAG_TRANSFORM = "translate(24 25) scale(1.15) translate(-16 -17.25)";

function Mesh() {
  return (
    <>
      {MESH_OFFSETS.map((offset) => (
        <path key={`a${offset}`} d={`M${offset} 0 L${offset + 48} 48`} />
      ))}
      {MESH_OFFSETS.map((offset) => (
        <path key={`b${offset}`} d={`M${offset + 48} 0 L${offset} 48`} />
      ))}
    </>
  );
}

/**
 * Square fishing net. In `compact` mode the name slides into the net and
 * turns into a trash bag caught underneath it.
 */
export function Logo({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  /** Icon only, slightly smaller (used in the navbar once the page is scrolled). */
  compact?: boolean;
}) {
  const light = tone === "light";
  const id = useId().replace(/:/g, "");
  const netClipId = `net-logo-${id}`;
  const bagClipId = `net-logo-bag-${id}`;

  return (
    <span
      className={`inline-flex items-center font-bold tracking-tight transition-[gap] duration-500 ease-in-out ${compact ? "delay-0" : "delay-150"} motion-reduce:transition-none ${
        compact ? "gap-0" : "gap-3"
      } ${light ? "text-cream" : "text-amsterdam-purple-brown"}`}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden
        className={`shrink-0 overflow-visible transition-[width,height] duration-500 ease-in-out ${compact ? "delay-0" : "delay-150"} motion-reduce:transition-none ${
          compact ? "size-9" : "size-12"
        }`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <clipPath id={netClipId}>
            <path d={NET_OUTLINE} />
          </clipPath>
          <clipPath id={bagClipId}>
            <path d={STEP_ICON_BAG_PATH} transform={BAG_TRANSFORM} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${netClipId})`} strokeWidth={1}>
          <Mesh />
        </g>

        <g
          style={{ transformBox: "fill-box", transformOrigin: "100% 50%" }}
          className={`motion-reduce:transition-none ${
            compact
              ? "translate-x-0 scale-100 opacity-100 [transition:translate_400ms_cubic-bezier(0.34,1.56,0.64,1)_350ms,scale_400ms_cubic-bezier(0.34,1.56,0.64,1)_350ms,opacity_150ms_linear_350ms]"
              : "translate-x-[14px] scale-50 opacity-0 [transition:translate_200ms_ease-in,scale_200ms_ease-in,opacity_200ms_ease-in]"
          }`}
        >
          <path d={STEP_ICON_BAG_PATH} transform={BAG_TRANSFORM} fill="currentColor" stroke="none" />
          <g
            clipPath={`url(#${bagClipId})`}
            strokeWidth={0.6}
            opacity={0.55}
            className={light ? "text-amsterdam-purple-brown" : "text-cream"}
          >
            <Mesh />
          </g>
        </g>

        <path d={NET_OUTLINE} strokeWidth={1.8} />
      </svg>
      <span
        aria-hidden={compact}
        className={`origin-left whitespace-nowrap text-lg motion-reduce:transition-none ${
          compact
            ? "max-w-0 -translate-x-[18px] scale-[0.15] opacity-0 [transition:max-width_500ms_ease-in-out,translate_500ms_ease-in,scale_500ms_ease-in,opacity_150ms_linear_350ms]"
            : "max-w-64 translate-x-0 scale-100 opacity-100 [transition:max-width_500ms_ease-in-out_150ms,translate_500ms_ease-out_150ms,scale_500ms_ease-out_150ms,opacity_150ms_linear_150ms]"
        }`}
      >
        {site.name}
      </span>
    </span>
  );
}
