import { Link } from "react-router-dom";
import { useI18n } from "../i18n";

export function NotFound() {
  const { t } = useI18n();
  return (
    <main className="page empty">
      <p className="kicker">404</p>
      <h1>{t.notFound.title}</h1>
      <p className="lead">{t.notFound.text}</p>
      <Link className="btn terracotta" to="/">
        {t.notFound.cta}
      </Link>
    </main>
  );
}
