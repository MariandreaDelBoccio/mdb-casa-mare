import { useEffect, useRef, useState } from "react";
import { gallery } from "../data";
import { useI18n } from "../i18n";

export function Gallery() {
  const { t } = useI18n();
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      let best = 0;
      let bestDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.getBoundingClientRect().left - el.getBoundingClientRect().left);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="page gallery-walk">
      <header className="page-hero">
        <p className="kicker">{t.gallery.kicker}</p>
        <h1>{t.gallery.title}</h1>
        <p className="lead">{t.gallery.lead}</p>
      </header>
      <div className="gallery-walk-strip" ref={stripRef} aria-label={t.gallery.title}>
        {gallery.map((item, i) => (
          <figure
            key={item.id}
            className={`walk-frame${i === active ? " is-active" : ""}${item.wide ? " wide" : ""}`}
          >
            <img src={item.src} alt={t.gallery.captions[item.id as keyof typeof t.gallery.captions]} />
            <figcaption>{t.gallery.captions[item.id as keyof typeof t.gallery.captions]}</figcaption>
          </figure>
        ))}
      </div>
      <div className="walk-progress" aria-hidden="true">
        <i style={{ width: `${((active + 1) / gallery.length) * 100}%` }} />
      </div>
    </main>
  );
}
