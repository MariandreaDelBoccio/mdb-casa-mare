import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { rooms } from "../data";
import { useI18n } from "../i18n";
import { todayISO, type BookingDraft } from "../lib";

type Props = {
  variant?: "hero" | "inline";
  defaults?: Partial<BookingDraft>;
};

/** Simulated full nights — portfolio demo, not a real calendar. */
const BLOCKED = new Set(["2026-10-18", "2026-10-19", "2026-11-01"]);

type BarErrors = Partial<Record<"checkIn" | "checkOut" | "availability", string>>;

export function BookingBar({ variant = "hero", defaults }: Props) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(defaults?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(defaults?.checkOut ?? "");
  const [guests, setGuests] = useState(defaults?.guests ?? 2);
  const [roomId, setRoomId] = useState(defaults?.roomId ?? "");
  const [errors, setErrors] = useState<BarErrors>({});
  const [checking, setChecking] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: BarErrors = {};
    if (!checkIn) next.checkIn = t.booking.errors.checkIn;
    else if (checkIn < todayISO()) next.checkIn = t.booking.errors.past;
    if (!checkOut || checkOut <= checkIn) next.checkOut = t.booking.errors.checkOut;

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setChecking(true);
    setErrors({});
    await new Promise((r) => setTimeout(r, 450));

    const blocked =
      BLOCKED.has(checkIn) ||
      BLOCKED.has(checkOut) ||
      (checkIn <= "2026-10-18" && checkOut > "2026-10-18");

    setChecking(false);

    if (blocked) {
      setErrors({ availability: t.bookingBar.unavailable });
      return;
    }

    const params = new URLSearchParams();
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    params.set("guests", String(guests));
    if (roomId) params.set("room", roomId);
    navigate(
      { pathname: "/booking", search: params.toString() },
      { state: { checkIn, checkOut, guests, roomId } },
    );
  };

  return (
    <form
      className={variant === "hero" ? "book-bar hero-bar sticky-ready" : "book-bar"}
      onSubmit={onSubmit}
      noValidate
    >
      <label>
        <span>{t.bookingBar.checkIn}</span>
        <input
          type="date"
          min={todayISO()}
          value={checkIn}
          aria-invalid={Boolean(errors.checkIn)}
          onChange={(e) => {
            setCheckIn(e.target.value);
            setErrors((prev) => ({ ...prev, checkIn: undefined, availability: undefined }));
          }}
        />
        {errors.checkIn ? <em className="field-error">{errors.checkIn}</em> : null}
      </label>
      <label>
        <span>{t.bookingBar.checkOut}</span>
        <input
          type="date"
          min={checkIn || todayISO()}
          value={checkOut}
          aria-invalid={Boolean(errors.checkOut)}
          onChange={(e) => {
            setCheckOut(e.target.value);
            setErrors((prev) => ({ ...prev, checkOut: undefined, availability: undefined }));
          }}
        />
        {errors.checkOut ? <em className="field-error">{errors.checkOut}</em> : null}
      </label>
      <label>
        <span>{t.bookingBar.guests}</span>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? t.bookingBar.guest : t.bookingBar.guestsPlural}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>{t.bookingBar.room}</span>
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="">{t.bookingBar.anyRoom}</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {t.roomCopy[room.id].name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn terracotta" disabled={checking}>
        {checking ? t.bookingBar.checking : t.bookingBar.cta}
      </button>
      {errors.availability ? (
        <p className="book-bar-error" role="alert">
          {errors.availability}
        </p>
      ) : null}
    </form>
  );
}
