import React from "react";
import { motion } from "framer-motion";
import "./ServicesOverviewSection.css";

function ServicesOverviewSection() {
  const EASE_PREMIUM = [0.22, 1, 0.36, 1];

  const textBlock = {
    hidden: { opacity: 0, x: -70 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: EASE_PREMIUM,
      },
    },
  };

  const collageContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.08,
      },
    },
  };

  const imageItem = {
    hidden: { opacity: 0, x: 60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: EASE_PREMIUM,
      },
    },
  };

  return (
    <section className="services-overview-section">
      <div className="services-overview-container">
        <motion.div
          className="services-overview-content"
          variants={textBlock}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -120px 0px" }}
        >
          <span className="services-overview-label">Асортимент і послуги</span>

          <h2 className="services-overview-title">
            Повний спектр кліматичних рішень
          </h2>
          <div className="services-overview-inner-title">
            для дому та бізнесу
          </div>
          <p className="services-overview-text">
            Ми пропонуємо широкий вибір кондиціонерів для квартир, приватних
            будинків, офісів і комерційних приміщень. У нашому асортименті —
            сучасні on/off моделі, інверторні кондиціонери, спліт-системи та
            ефективні кліматичні рішення для різних форматів простору.
          </p>

          <p className="services-overview-text">
            Окрім підбору обладнання, ми виконуємо монтаж і демонтаж внутрішніх
            та зовнішніх блоків будь-якої складності. Працюємо як зі
            стандартними побутовими системами, так і з рішеннями для комерційних
            об’єктів, де важливі точність, досвід і надійний результат.
          </p>

          <p className="services-overview-text">
            Також ми забезпечуємо технічне обслуговування кондиціонерів
            будь-якого виду та типу, допомагаючи підтримувати їх ефективну,
            стабільну й довговічну роботу протягом усього сезону.
          </p>
        </motion.div>

        <motion.div
          className="services-overview-collage"
          variants={collageContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -120px 0px" }}
        >
          <div className="services-overview-top-row">
            <motion.div
              className="services-image services-image-small"
              variants={imageItem}
            >
              <img
                src="/images/page-images/installation-of-the-indoor-unit-of-an-air-conditioner.png"
                alt="Монтаж кондиціонера"
              />
            </motion.div>

            <motion.div
              className="services-image services-image-large"
              variants={imageItem}
            >
              <img
                src="/images/page-images/installation-of-an-outdoor-air-conditioning-unit.png"
                alt="Технічне обслуговування кондиціонерів"
              />
            </motion.div>
          </div>

          <motion.div
            className="services-image services-image-bottom"
            variants={imageItem}
          >
            <img
              src="/images/page-images/air-conditioner-repair.png"
              alt="Кліматичне рішення для бізнесу"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesOverviewSection;
