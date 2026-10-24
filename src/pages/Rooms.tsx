import { useEffect, useRef, useState } from "react";
import { RoomTile } from "../components/RoomTile";
import { rooms } from "../data";
import { useI18n } from "../i18n";

export function Rooms() {
  const { t } = useI18n();
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.querySelectorAll(".room-tile")) as HTMLElement[];
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
    <main className="page rooms-walk">
      <header className="page-hero">
        <p className="kicker">{t.rooms.kicker}</p>
        <h1>{t.rooms.title}</h1>
        <p className="lead">{t.rooms.lead}</p>
      </header>
      <div className="film-strip rooms-atmosphere" ref={stripRef} aria-label={t.rooms.title}>
        {rooms.map((room, i) => (
          <div key={room.id} className={`walk-room${i === active ? " is-active" : ""}`}>
            <RoomTile room={room} featured={i % 5 === 0} />
          </div>
        ))}
      </div>
      <div className="walk-progress" aria-hidden="true">
        <i style={{ width: `${((active + 1) / rooms.length) * 100}%` }} />
      </div>
    </main>
  );
}
