import { site } from "../config/site";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <span className={`inline-flex items-center gap-2.5 font-bold tracking-tight ${light ? "text-cream" : "text-amsterdam-purple-brown"}`}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8">
        <rect width="32" height="32" rx="9" fill={light ? "#F6F2EA" : "#3E2022"} />
        <path d="M7.5 23c0-5.2 3.8-9.5 8.5-9.5s8.5 4.3 8.5 9.5" fill="none" stroke={light ? "#3E2022" : "#F6F2EA"} strokeWidth="1.8" />
        <path d="M10 17.5l12 5.5M22 17.5l-12 5.5M16 13.5V23" stroke={light ? "#3E2022" : "#F6F2EA"} strokeWidth="1.3" />
        <circle cx="7.5" cy="23" r="1.9" fill="#E8833A" />
        <circle cx="24.5" cy="23" r="1.9" fill="#E8833A" />
      </svg>
      <span className="text-lg">{site.name}</span>
    </span>
  );
}
