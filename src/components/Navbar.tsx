import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Container";

export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#problem", label: t.nav.problem },
    { href: "#idea", label: t.nav.idea },
    { href: "#map", label: t.nav.map },
    { href: "#faq", label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a href="#top" aria-label="Amsterdam Netjes — Home" className="lg:flex-1" onClick={() => setOpen(false)}>
          <Logo compact={scrolled} />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] font-medium text-ink-soft hover:text-bollard">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex lg:flex-1">
          <LanguageToggle />
          <ButtonLink href="#apply">{t.nav.apply}</ButtonLink>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line bg-paper text-amsterdam-purple-brown lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-lg font-semibold text-amsterdam-purple-brown hover:bg-bollard/5"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-4">
              <LanguageToggle />
              <ButtonLink href="#apply" onClick={() => setOpen(false)}>
                {t.nav.apply}
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
