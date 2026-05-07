import React, { useEffect } from "react";
import "./styles/App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Footer from "./components/footer/Footer";
import Lenis from "@studio-freight/lenis";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis?.scrollTo) {
      window.__lenis.scrollTo(0, {
        immediate: true,
      });
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      prevent: (node) => {
        return !!node?.closest?.(
          `
      .react-datepicker,
      .react-datepicker-popper,
      .cta-datepicker-popper,
      .cta-datepicker-calendar,
      .cta-form-field--calendar,
      .cta-select__menu,
      .cta-select__menu-list,
      .cta-select__control,
      .cta-select-wrapper,
      [data-lenis-prevent-wheel]
      `,
        );
      },
    });

    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
