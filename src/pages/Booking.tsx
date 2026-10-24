import { useMemo, useState, type FormEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getRoom, rooms } from "../data";
import { useI18n, type RoomId } from "../i18n";
import { formatEUR, isValidEmail, nightsBetween, todayISO, type BookingDraft } from "../lib";

type Errors = Partial<Record<"checkIn" | "checkOut" | "guests" | "name" | "email" | "form", string>>;

function readDraft(search: URLSearchParams, state: unknown): Partial<BookingDraft> {
  const fromState = state && typeof state === "object" ? (state as Partial<BookingDraft>) : {};
  return {
    checkIn: search.get("checkIn") || fromState.checkIn || "",
    checkOut: search.get("checkOut") || fromState.checkOut || "",
    guests: Number(search.get("guests") || fromState.guests || 2),
    roomId: search.get("room") || fromState.roomId || "",
  };
}

export function Booking() {
  const { t, lang } = useI18n();
  const location = useLocation();
  const [search] = useSearchParams();
  const initial = useMemo(() => readDraft(search, location.state), [search, location.state]);

  const [checkIn, setCheckIn] = useState(initial.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initial.checkOut ?? "");
  const [guests, setGuests] = useState(initial.guests && initial.guests > 0 ? initial.guests : 2);
  const [roomId, setRoomId] = useState(initial.roomId ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const room = roomId ? getRoom(roomId) : undefined;
  const nights = nightsBetween(checkIn, checkOut);
  const total = room && nights ? room.price * nights : 0;

  const validate = (): Errors => {
    const next: Errors = {};
    if (!checkIn) next.checkIn = t.booking.errors.checkIn;
    else if (checkIn < todayISO()) next.checkIn = t.booking.errors.past;
    if (!checkOut || nights < 1) next.checkOut = t.booking.errors.checkOut;
    if (!guests || guests < 1) next.guests = t.booking.errors.guests;
    else if (room && guests > room.capacity) next.guests = t.booking.errors.guestsMax;
    if (!name.trim()) next.name = t.booking.errors.name;
    if (!isValidEmail(email)) next.email = t.booking.errors.email;
    if (Object.keys(next).length) next.form = t.booking.errors.form;
    return next;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (next.form) return;
    setDone(true);
  };

  if (done) {
    return (
      <main className="page empty success">
        <p className="kicker">{t.booking.kicker}</p>
        <h1>{t.booking.successTitle}</h1>
        <p className="lead">{t.booking.successText}</p>
        <dl className="confirm">
          <div>
            <dt>{t.bookingBar.checkIn}</dt>
            <dd>{checkIn}</dd>
          </div>
          <div>
            <dt>{t.bookingBar.checkOut}</dt>
            <dd>{checkOut}</dd>
          </div>
          <div>
            <dt>{t.bookingBar.guests}</dt>
            <dd>{guests}</dd>
          </div>
          <div>
            <dt>{t.bookingBar.room}</dt>
            <dd>{room ? t.roomCopy[room.id].name : t.bookingBar.anyRoom}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="btn terracotta"
          onClick={() => {
            setDone(false);
            setName("");
            setEmail("");
            setNotes("");
            setErrors({});
          }}
        >
          {t.booking.another}
        </button>
      </main>
    );
  }

  return (
    <main className="page booking-page">
      <header className="page-hero">
        <p className="kicker">{t.booking.kicker}</p>
        <h1>{t.booking.title}</h1>
        <p className="lead">{t.booking.lead}</p>
      </header>
      <div className="split">
        <form className="form" onSubmit={onSubmit} noValidate>
          {errors.form ? <p className="form-banner">{errors.form}</p> : null}
          <div className="form-row">
            <label className={errors.checkIn ? "invalid" : undefined}>
              <span>{t.bookingBar.checkIn}</span>
              <input type="date" min={todayISO()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              {errors.checkIn ? <em>{errors.checkIn}</em> : null}
            </label>
            <label className={errors.checkOut ? "invalid" : undefined}>
              <span>{t.bookingBar.checkOut}</span>
              <input
                type="date"
                min={checkIn || todayISO()}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              {errors.checkOut ? <em>{errors.checkOut}</em> : null}
            </label>
          </div>
          <div className="form-row">
            <label className={errors.guests ? "invalid" : undefined}>
              <span>{t.bookingBar.guests}</span>
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {errors.guests ? <em>{errors.guests}</em> : null}
            </label>
            <label>
              <span>{t.bookingBar.room}</span>
              <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                <option value="">{t.bookingBar.anyRoom}</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {t.roomCopy[r.id].name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className={errors.name ? "invalid" : undefined}>
            <span>{t.booking.name}</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            {errors.name ? <em>{errors.name}</em> : null}
          </label>
          <label className={errors.email ? "invalid" : undefined}>
            <span>{t.booking.email}</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            {errors.email ? <em>{errors.email}</em> : null}
          </label>
          <label>
            <span>{t.booking.notes}</span>
            <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.booking.notesPh} />
          </label>
          <button type="submit" className="btn terracotta">
            {t.booking.submit}
          </button>
        </form>
        <aside className="summary">
          <h2>{t.booking.summary}</h2>
          <p>
            {room ? t.roomCopy[room.id as RoomId].name : t.bookingBar.anyRoom}
            {nights ? ` · ${nights} ${nights === 1 ? t.booking.night : t.booking.nights}` : ""}
          </p>
          {total ? (
            <p className="room-price large">
              {t.booking.total}
              <br />
              {formatEUR(total, lang)}
            </p>
          ) : (
            <p className="muted">{t.booking.lead}</p>
          )}
        </aside>
      </div>
    </main>
  );
}
