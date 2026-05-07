import React from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaTools, FaShieldAlt } from "react-icons/fa";
import "./AdvantagesSection.css";

function AdvantagesSection() {
  const EASE_PREMIUM = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASE_PREMIUM,
      },
    },
  };

  return (
    <section className="advantages-section">
      <div className="advantages-container">
        <motion.div
          className="advantages-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <span className="advantages-label">Наші переваги</span>
          <h2 className="advantages-title">Чому клієнти обирають саме нас</h2>
          <p className="advantages-subtitle">
            Поєднуємо досвід, професійний підхід і якісний сервіс, щоб кожне
            кліматичне рішення було надійним та комфортним у користуванні.
          </p>
        </motion.div>

        <motion.div
          className="advantages-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.12, margin: "0px 0px -120px 0px" }}
        >
          <motion.article className="advantage-card" variants={cardVariants}>
            <div className="advantage-icon">
              <FaUserCheck />
            </div>

            <h3 className="advantage-card-title">Досвід</h3>

            <p className="advantage-card-text">
              Ми впевнено розвиваємося у сфері кліматичної техніки та добре
              розуміємо, як підібрати ефективне рішення під різні потреби.
            </p>

            <ul className="advantage-list">
              <li>Понад 10 років досвіду у сфері</li>
              <li>Практика з великими комерційними об’єктами</li>
              <li>Розуміння різних типів систем і конфігурацій</li>
            </ul>
          </motion.article>

          <motion.article className="advantage-card" variants={cardVariants}>
            <div className="advantage-icon">
              <FaTools />
            </div>

            <h3 className="advantage-card-title">Професійний підхід</h3>

            <p className="advantage-card-text">
              Виконуємо монтаж, демонтаж і технічне обслуговування уважно до
              деталей, дотримуючись акуратності та технічних вимог.
            </p>

            <ul className="advantage-list">
              <li>Монтаж і демонтаж будь-якої складності</li>
              <li>Успішна робота зі всіма типами обладнання</li>
              <li>Рішення для дому, офісів і ком. приміщень</li>
            </ul>
          </motion.article>

          <motion.article className="advantage-card" variants={cardVariants}>
            <div className="advantage-icon">
              <FaShieldAlt />
            </div>

            <h3 className="advantage-card-title">Надійність і сервіс</h3>

            <p className="advantage-card-text">
              Для нас важливо, щоб клієнт отримував не лише обладнання, а й
              стабільний результат та якісне обслуговування.
            </p>

            <ul className="advantage-list">
              <li>Консультація та допомога у виборі обладнання</li>
              <li>Обслуговування кондиціонерів будь-якого типу</li>
              <li>Орієнтація на довготривалу роботу систем</li>
            </ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

export default AdvantagesSection;
