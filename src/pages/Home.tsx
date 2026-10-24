import { Link } from "react-router-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookingBar } from "../components/BookingBar";
import { RoomTile } from "../components/RoomTile";
import { IMAGES, rooms } from "../data";
import { useI18n } from "../i18n";

function VeilSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`veil-section${inView ? " is-in" : ""} ${className}`.trim()}>
      {children}
    </section>
  );
}

export function Home() {
  const { t, lang } = useI18n();
  const featured = rooms.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <img className="hero-img" src={IMAGES.hero} alt="" />
        <div className="hero-veil" />
        <div className="hero-copy hero-copy-rise">
          <p className="kicker light">{t.hero.kicker}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-lead">{t.hero.lead}</p>
        </div>
        <BookingBar />
      </section>

      <VeilSection className="intro">
        <div className="intro-copy">
          <p className="kicker">{t.home.introKicker}</p>
          <h2>{t.home.introTitle}</h2>
          <p>{t.home.introText}</p>
        </div>
        <div className="intro-photos">
          <img src={IMAGES.limewash} alt="" />
          <img src={IMAGES.linen} alt="" />
        </div>
      </VeilSection>

      <VeilSection className="rituals">
        <h2>{t.home.ritualTitle}</h2>
        <ol>
          {t.home.rituals.map((item) => (
            <li key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </VeilSection>

      <VeilSection className="home-rooms">
        <div className="section-head">
          <p className="kicker">{t.home.roomsKicker}</p>
          <h2>{t.home.roomsTitle}</h2>
        </div>
        <div className="room-grid">
          {featured.map((room, i) => (
            <RoomTile key={room.id} room={room} featured={i === 0} />
          ))}
        </div>
        <div className="section-cta">
          <Link className="btn ink" to="/rooms">
            {t.home.roomsCta}
          </Link>
          <Link className="btn ghost" to="/gallery">
            {t.home.galleryCta}
          </Link>
        </div>
      </VeilSection>

      <section className="evening-atmosphere" aria-label="Evening">
        <img src={IMAGES.interior} alt="" />
        <div className="evening-veil" />
        <div className="evening-copy">
          <p className="kicker light">{t.hero.kicker}</p>
          <h2>{lang === "es" ? "Cuando cae la noche." : "When evening settles."}</h2>
          <p>
            {lang === "es"
              ? "La cala se oscurece, el lino se enfría, y la casa habla en voz baja."
              : "The cala darkens, the linen cools, and the house speaks softly."}
          </p>
        </div>
      </section>
    </main>
  );
}
