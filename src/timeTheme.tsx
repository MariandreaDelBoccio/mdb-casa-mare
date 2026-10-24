import { useEffect, useState } from "react";

export type DayPhase = "day" | "dusk" | "night";

export function phaseFromHour(hour: number): DayPhase {
  if (hour >= 7 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "dusk";
  return "night";
}

/** Applies data-phase on <html> from the visitor's local clock. */
export function useDaylightTheme() {
  const [phase, setPhase] = useState<DayPhase>(() =>
    phaseFromHour(new Date().getHours()),
  );

  useEffect(() => {
    const sync = () => setPhase(phaseFromHour(new Date().getHours()));
    sync();
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.phase = phase;
  }, [phase]);

  return phase;
}
