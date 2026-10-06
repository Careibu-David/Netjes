import { AmsterdamMap } from "./components/AmsterdamMap";
import { CommunityStats } from "./components/CommunityStats";
import { FAQ } from "./components/FAQ";
import { QuoteSection } from "./components/QuoteSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { ImpactSection } from "./components/ImpactSection";
import { Navbar } from "./components/Navbar";
import { PilotApplication } from "./components/PilotApplication";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { useLanguage } from "./i18n/useLanguage";

export default function App() {
  const { t } = useLanguage();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-amsterdam-purple-brown focus:px-4 focus:py-2 focus:text-cream"
      >
        {t.meta.skipToContent}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ProblemSection />
        <ImpactSection />
        <SolutionSection />
        <HowItWorks />
        <AmsterdamMap />
        <PilotApplication />
        <CommunityStats />
        <QuoteSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
