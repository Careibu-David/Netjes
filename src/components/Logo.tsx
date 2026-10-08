import { useId } from "react";
import { site } from "../config/site";

const NET_OUTLINE =
  "M4 4 Q24 10 44 4 Q38 24 44 44 Q24 38 4 44 Q10 24 4 4 Z";

const MESH_OFFSETS = Array.from({ length: 17 }, (_, i) => i * 6 - 48);

/** Square fishing net. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  const netClipId = `net-logo-${useId().replace(/:/g, "")}`;

  return (
    <span
      className={`inline-flex items-center gap-3 font-bold tracking-tight ${
        light ? "text-cream" : "text-amsterdam-purple-brown"
      }`}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden
        className="size-12 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <clipPath id={netClipId}>
            <path d={NET_OUTLINE} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${netClipId})`} strokeWidth={1}>
          {MESH_OFFSETS.map((offset) => (
            <path key={`a${offset}`} d={`M${offset} 0 L${offset + 48} 48`} />
          ))}
          {MESH_OFFSETS.map((offset) => (
            <path key={`b${offset}`} d={`M${offset + 48} 0 L${offset} 48`} />
          ))}
        </g>

        <path d={NET_OUTLINE} strokeWidth={1.8} />
      </svg>
      <span className="text-lg">{site.name}</span>
    </span>
  );
}
