import React, { useEffect, useRef } from "react";
import Carousel from "../components/carousel/Carousel";
import "../styles/App.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import AboutIntroSection from "../components/home-page/AboutIntroSection";
import ServicesOverviewSection from "../components/home-page/ServicesOverviewSection";
import AdvantagesSection from "../components/home-page/AdvantagesSection";
import HowWeWorkSection from "../components/home-page/HowWeWorkSection";
import CTARequestSection from "../components/home-page/CTARequestSection";
import FAQSection from "../components/home-page/FAQSection";

function Home() {
  const nextSectionRef = useRef(null);

  const handleScrollToNext = () => {
    const el = nextSectionRef.current;
    if (!el) return;

    if (window.__lenis?.scrollTo) {
      window.__lenis.scrollTo(el, {
        offset: 0,
        duration: 1.1,
      });
      return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.6, once: false });

  const scrollBtnControls = useAnimation();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      scrollBtnControls.stop();

      if (!heroInView) {
        await scrollBtnControls.start("hidden");
        return;
      }

      await scrollBtnControls.start("visible");
      if (cancelled) return;

      await scrollBtnControls.start("pulse");
    };

    run();

    return () => {
      cancelled = true;
      scrollBtnControls.stop();
    };
  }, [heroInView, scrollBtnControls]);

  const EASE_PREMIUM = [0.22, 1, 0.36, 1];

  const titleWordLeft = {
    hidden: { opacity: 0, x: -110 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.35, ease: EASE_PREMIUM },
    },
  };

  const titleWordRight = {
    hidden: { opacity: 0, x: 110 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.35, ease: EASE_PREMIUM },
    },
  };

  const subtitleAndBtn = {
    hidden: { opacity: 0, y: 34 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.35, ease: EASE_PREMIUM },
    },
  };

  const scrollBtnVariants = {
    hidden: { opacity: 0, y: 16, scale: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.35, ease: EASE_PREMIUM },
    },
    pulse: {
      scale: [1, 1.08, 1],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <div className="wrapper-hero">
      <section
        ref={heroRef}
        className="hero"
        aria-label="Aero Climate hero section"
      >
        <video
          className="hero__video"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster="/images/page-images/image.png"
        >
          <source src="/videos/climate-tec-small-size.mp4" type="video/mp4" />
        </video>

        <div className="hero__overlay" aria-hidden="true" />

        <motion.div
          className="hero__content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
        >
          <h1 className="hero__title hero__titleSplit">
            <motion.span variants={titleWordLeft} className="hero__titleWord">
              AERO
            </motion.span>
            <motion.span variants={titleWordRight} className="hero__titleWord">
              CLIMATE
            </motion.span>
          </h1>

          <motion.div variants={subtitleAndBtn} className="hero__cta">
            <p className="hero__subtitle">Комфорт у кожному подиху</p>

            <motion.button
              type="button"
              className="hero__scroll hero__scrollInline"
              onClick={handleScrollToNext}
              aria-label="Scroll to next section"
              variants={scrollBtnVariants}
              initial="hidden"
              animate={scrollBtnControls}
            >
              <span className="hero__scrollIcon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24">
                  <path
                    d="M12 16.5l-7-7 1.4-1.4L12 13.7l5.6-5.6L19 9.5l-7 7z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <div className="wrapper_main">
        <section ref={nextSectionRef} className="home_section">
          <motion.h2
            className="title_carousel"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: false,
              amount: 0.1,
              margin: "0px 0px -140px 0px",
            }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            Хіти продажу
          </motion.h2>
          <div className="wrapper_carousel">
            <Carousel />
          </div>

          <motion.div
            className="home_inventory_button_wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{
              once: false,
              amount: 0.1,
              margin: "0px 0px -120px 0px",
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/air-conditioners" className="home_inventory_button">
              Переглянути інші кондиціонери
            </Link>
          </motion.div>
        </section>

        <AboutIntroSection />
        <ServicesOverviewSection />
        <AdvantagesSection />
        <HowWeWorkSection />
        <CTARequestSection />
        <FAQSection />
      </div>
    </div>
  );
}

export default Home;
