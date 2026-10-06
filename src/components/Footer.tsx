import { site } from "../config/site";
import { useLanguage } from "../i18n/useLanguage";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";

const YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  return (
    <footer className="bg-amsterdam-purple-brown-900 text-cream">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo tone="light" />
            <p className="mt-5 max-w-md leading-relaxed text-cream/70">{f.description}</p>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/50">{f.contact}</h2>
            <a href={`mailto:${site.contactEmail}`} className="mt-4 block font-semibold hover:text-accent-100">
              {site.contactEmail}
            </a>
          </div>
          <nav aria-label="Legal" className="md:col-span-3">
            <ul className="space-y-3 text-cream/80">
              <li>
                <a href="#privacy" className="hover:text-cream">
                  {f.privacy}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-cream">
                  {f.terms}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-cream/10 pt-6 text-sm text-cream/50 sm:flex-row sm:justify-between">
          <p>
            © {YEAR} {site.name}
          </p>
          <p>{f.notAffiliated}</p>
        </div>
      </Container>
    </footer>
  );
}
