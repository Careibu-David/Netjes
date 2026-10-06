import { ArrowRight, MapPin } from "lucide-react";
import heroVideoUrl from "../../Videos/Video 3.mp4?url";
import { useLanguage } from "../i18n/useLanguage";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Container";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section id="top" aria-labelledby="hero-title" className="overflow-x-clip bg-cream pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <div className="min-w-0">
          <h1
            id="hero-title"
            className="text-[2.6rem] font-extrabold leading-[1.02] text-amsterdam-purple-brown sm:text-6xl lg:text-[4.1rem]"
          >
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{t.hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#apply" size="lg">
              {t.hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#map" size="lg" variant="secondary">
              <MapPin className="size-4" aria-hidden />
              {t.hero.secondaryCta}
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm font-semibold text-bollard">{t.hero.footnote}</p>
        </div>
        {/* Negative margins cancel the section padding and the container gutter so the frame meets the section edges. */}
        <div className="flex min-w-0 -mx-5 w-[calc(100%+2.5rem)] justify-center sm:-mx-8 sm:w-[calc(100%+4rem)] lg:mx-0 lg:-mb-24 lg:-mr-[calc((max(100vw,1200px)-1200px)/2+2rem)] lg:-mt-20 lg:w-auto lg:justify-end lg:self-stretch">
          <div className="aspect-square w-full overflow-hidden rounded-none border-y border-line bg-paper lg:aspect-auto lg:border lg:border-r-0">
            <video
              src={heroVideoUrl}
              className="h-full w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              aria-label={t.hero.sceneLabel}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
