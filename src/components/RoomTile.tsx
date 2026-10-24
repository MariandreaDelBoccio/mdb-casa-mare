import { Link } from "react-router-dom";
import type { Room } from "../data";
import { useI18n } from "../i18n";
import { formatEUR } from "../lib";

export function RoomTile({ room, featured }: { room: Room; featured?: boolean }) {
  const { t, lang } = useI18n();
  const copy = t.roomCopy[room.id];
  return (
    <article className={featured ? "room-tile featured" : "room-tile"}>
      <Link to={`/rooms/${room.id}`} className="room-photo">
        <img src={room.image} alt={copy.name} />
      </Link>
      <div className="room-body">
        <p className="kicker">
          {room.sizeM2} {t.rooms.size} · {room.capacity} {t.rooms.guests}
        </p>
        <h3>
          <Link to={`/rooms/${room.id}`}>{copy.name}</Link>
        </h3>
        <p className="room-short">{copy.short}</p>
        <p className="room-price">
          {t.rooms.from} {formatEUR(room.price, lang)}
          <span>{t.rooms.night}</span>
        </p>
        <Link className="text-link" to={`/rooms/${room.id}`}>
          {t.rooms.view}
        </Link>
      </div>
    </article>
  );
}
