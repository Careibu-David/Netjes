import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";

type StreetCompareProps = {
  label: string;
  hint: string;
  messyTitle: string;
  cleanTitle: string;
  beforeVideoSrc: string;
  afterVideoSrc: string;
};

const START = 6;

function CompareVideo({
  src,
  title,
  className,
  videoRef,
}: {
  src: string;
  title: string;
  className?: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={title}
    />
  );
}

export function StreetCompare({
  label,
  hint,
  messyTitle,
  cleanTitle,
  beforeVideoSrc,
  afterVideoSrc,
}: StreetCompareProps) {
  const [pos, setPos] = useState(START);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const videos = () =>
      [beforeVideoRef.current, afterVideoRef.current].filter(Boolean) as HTMLVideoElement[];

    const observer = new IntersectionObserver(
      ([entry]) => {
        const list = videos();
        if (entry?.isIntersecting) {
          for (const video of list) void video.play().catch(() => {});
        } else {
          for (const video of list) video.pause();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [beforeVideoSrc, afterVideoSrc]);

  const videoClassName = "absolute inset-0 h-full w-full object-contain";

  return (
    <div ref={rootRef} className="relative select-none overflow-hidden rounded-[28px] border border-line bg-ink">
      <div className="relative aspect-video w-full">
        <CompareVideo
          videoRef={beforeVideoRef}
          src={beforeVideoSrc}
          title={messyTitle}
          className={videoClassName}
        />

        <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <CompareVideo
            videoRef={afterVideoRef}
            src={afterVideoSrc}
            title={cleanTitle}
            className={videoClassName}
          />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          aria-label={label}
          aria-valuetext={`${pos}%`}
          onChange={(e) => {
            setPos(Number(e.target.value));
            setTouched(true);
          }}
          className="peer absolute inset-0 z-10 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-paper shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
          style={{ left: `${pos}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 z-20 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-bollard shadow-md ring-bollard/40 peer-focus-visible:ring-4"
          style={{ left: `clamp(1.5rem, ${pos}%, calc(100% - 1.5rem))` }}
        >
          <ChevronsLeftRight className="size-5" aria-hidden />
        </div>

        {!touched && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 max-w-[min(90%,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/85 px-5 py-3 text-center text-sm font-semibold leading-snug text-cream shadow-lg sm:px-6 sm:py-3.5 sm:text-base">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}
