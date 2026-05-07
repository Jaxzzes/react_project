import React from "react";
import { motion } from "framer-motion";
import "./HowWeWorkSection.css";

function HowWeWorkSection() {
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
    hidden: { opacity: 0, y: 26 },
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
    <section className="how-work-section">
      <div className="how-work-container">
        <motion.div
          className="how-work-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
        >
          <span className="how-work-label">Як ми працюємо</span>
          <h2 className="how-work-title">
            Простий та зрозумілий шлях до комфортного клімату
          </h2>
          <p className="how-work-subtitle">
            Від першого звернення до запуску системи — супроводжуємо кожен етап
            та допомагаємо отримати готове рішення без зайвих складнощів.
          </p>
        </motion.div>

        <motion.div
          className="how-work-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1, margin: "0px 0px -120px 0px" }}
        >
          <motion.article className="how-work-card" variants={cardVariants}>
            <div className="how-work-step">01</div>
            <h3 className="how-work-card-title">Заявка і консультація</h3>
            <p className="how-work-card-text">
              Ви залишаєте заявку або зв’язуєтесь з нами зручним способом, а ми
              уточнюємо ваші побажання, тип приміщення та основні задачі.
            </p>
          </motion.article>

          <motion.article className="how-work-card" variants={cardVariants}>
            <div className="how-work-step">02</div>
            <h3 className="how-work-card-title">Підбір обладнання</h3>
            <p className="how-work-card-text">
              Підбираємо оптимальне рішення під площу приміщення, бюджет,
              побажання до функціоналу та особливості майбутнього монтажу.
            </p>
          </motion.article>

          <motion.article className="how-work-card" variants={cardVariants}>
            <div className="how-work-step">03</div>
            <h3 className="how-work-card-title">Монтаж / демонтаж</h3>
            <p className="how-work-card-text">
              Виконуємо всі необхідні роботи акуратно, технічно грамотно та з
              урахуванням особливостей внутрішніх і зовнішніх блоків.
            </p>
          </motion.article>

          <motion.article className="how-work-card" variants={cardVariants}>
            <div className="how-work-step">04</div>
            <h3 className="how-work-card-title">Перевірка та запуск</h3>
            <p className="how-work-card-text">
              Після завершення робіт перевіряємо систему, запускаємо обладнання
              та надаємо рекомендації для стабільної та ефективної експлуатації.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

export default HowWeWorkSection;
