import { Link, useParams } from "react-router-dom";
import { getRoom } from "../data";
import { useI18n, type RoomId } from "../i18n";
import { formatEUR } from "../lib";

export function RoomDetail() {
  const { id } = useParams();
  const { t, lang } = useI18n();
  const room = id ? getRoom(id) : undefined;

  if (!room) {
    return (
      <main className="page empty">
        <p className="kicker">{t.rooms.kicker}</p>
        <h1>{t.rooms.notFoundTitle}</h1>
        <p className="lead">{t.rooms.notFoundText}</p>
        <Link className="btn terracotta" to="/rooms">
          {t.rooms.back}
        </Link>
      </main>
    );
  }

  const copy = t.roomCopy[room.id as RoomId];

  return (
    <main className="page room-detail">
      <div className="detail-hero">
        <img src={room.image} alt={copy.name} />
      </div>
      <div className="detail-body">
        <p className="kicker">
          {room.sizeM2} {t.rooms.size} · {room.capacity} {t.rooms.guests}
        </p>
        <h1>{copy.name}</h1>
        <p className="lead">{copy.short}</p>
        <p>{copy.description}</p>
        <p className="room-price large">
          {formatEUR(room.price, lang)}
          <span>{t.rooms.night}</span>
        </p>
        <div className="detail-cta">
          <Link className="btn terracotta" to={`/booking?room=${room.id}`}>
            {t.rooms.book}
          </Link>
          <Link className="btn ghost" to="/rooms">
            {t.rooms.back}
          </Link>
        </div>
      </div>
      <div className="detail-gallery">
        {room.images.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </main>
  );
}
