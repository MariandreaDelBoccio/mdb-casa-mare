import { NavLink } from "react-router-dom";
import { PLACE } from "../data";
import { useI18n } from "../i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="wordmark">CASA MARÉ</p>
        <p className="footer-tag">{t.footer.tagline}</p>
      </div>
      <div className="footer-mid">
        <NavLink to="/rooms">{t.nav.rooms}</NavLink>
        <NavLink to="/gallery">{t.nav.gallery}</NavLink>
        <NavLink to="/booking">{t.nav.booking}</NavLink>
        <NavLink to="/contact">{t.nav.contact}</NavLink>
      </div>
      <p className="footer-meta">
        {PLACE.cala} · {PLACE.email}
      </p>
      <p className="footer-demo">{t.footer.demo}</p>
      <p className="footer-rights">{t.footer.rights}</p>
    </footer>
  );
}
