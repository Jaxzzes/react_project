import React from "react";
import { motion } from "framer-motion";
import "./AboutIntroSection.css";

function AboutIntroSection() {
  const EASE_PREMIUM = [0.22, 1, 0.36, 1];

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
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: EASE_PREMIUM,
      },
    },
  };

  const textBlock = {
    hidden: { opacity: 0, x: 70 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: EASE_PREMIUM,
      },
    },
  };

  return (
    <section className="about-intro-section">
      <div className="about-intro-container">
        <motion.div
          className="about-intro-collage"
          variants={collageContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -120px 0px" }}
        >
          <motion.div
            className="about-image about-image-top"
            variants={imageItem}
          >
            <img
              src="/images/page-images/interior-design.jpg"
              alt="Сучасний інтер’єр з кондиціонером"
            />
          </motion.div>

          <div className="about-intro-bottom-row">
            <motion.div
              className="about-image about-image-left"
              variants={imageItem}
            >
              <img
                src="/images/page-images/interior-design-commercial-space.jpg"
                alt="Комфортний клімат у комерційному приміщенні"
              />
            </motion.div>

            <motion.div
              className="about-image about-image-right"
              variants={imageItem}
            >
              <img
                src="/images/page-images/outdoor-unit.png"
                alt="Зовнішній блок кондиціонера"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="about-intro-content"
          variants={textBlock}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2, margin: "0px 0px -120px 0px" }}
        >
          <span className="about-intro-label">Про нас</span>

          <h2 className="about-intro-title">
            Створюємо комфортний клімат для вашого простору
          </h2>

          <p className="about-intro-text">
            Ми пропонуємо сучасні рішення для охолодження та підтримання
            комфортної температури у приміщеннях. Наша команда поєднує
            практичний підхід, уважність до деталей і бажання допомогти кожному
            клієнту знайти оптимальний варіант саме під його потреби.
          </p>

          <p className="about-intro-text">
            Для нас важливо не просто запропонувати техніку, а створити відчуття
            комфорту, надійності та впевненості у правильному виборі.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutIntroSection;
