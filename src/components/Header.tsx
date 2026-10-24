import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../i18n";

const links = [
  { to: "/", key: "stay" as const },
  { to: "/rooms", key: "rooms" as const },
  { to: "/gallery", key: "gallery" as const },
  { to: "/booking", key: "booking" as const },
  { to: "/contact", key: "contact" as const },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = location.pathname === "/" && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={overlay ? "header overlay" : "header"}>
      <NavLink to="/" className="wordmark">
        CASA MARÉ
      </NavLink>
      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)}>
            {t.nav[link.key]}
          </NavLink>
        ))}
      </nav>
      <div className="nav-end">
        <div className="lang" role="group" aria-label={t.lang.group}>
          <button type="button" className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
            EN
          </button>
          <button type="button" className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>
            ES
          </button>
        </div>
        <button
          type="button"
          className={open ? "menu open" : "menu"}
          aria-expanded={open}
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
