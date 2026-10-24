import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "../ScrollToTop";
import { useDaylightTheme } from "../timeTheme";

export function Layout() {
  const phase = useDaylightTheme();

  return (
    <div className="shell" data-phase={phase}>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
