import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FAQSection.css";

const faqItems = [
  {
    question:
      "Як зрозуміти, який кондиціонер підійде саме для мого приміщення?",
    answer:
      "Підбір залежить не тільки від площі кімнати, а й від висоти стелі, кількості вікон, сонячної сторони, утеплення, кількості техніки та людей у приміщенні. Для квартири, приватного будинку, офісу чи комерційного об’єкта вимоги можуть відрізнятися, тому перед покупкою ми уточнюємо основні параметри й допомагаємо обрати модель із відповідною потужністю.",
  },
  {
    question: "Чи виконуєте ви монтаж кондиціонерів у Дніпрі?",
    answer:
      "Так, ми надаємо послуги монтажу кондиціонерів у місті Дніпро. Перед встановленням узгоджуємо зручний час, особливості приміщення, місце розміщення внутрішнього та зовнішнього блоку, довжину траси й можливі додаткові роботи.",
  },
  {
    question: "Скільки часу займає встановлення кондиціонера?",
    answer:
      "Стандартний монтаж зазвичай займає кілька годин, якщо немає складних умов або додаткових робіт. Точний час залежить від типу стіни, доступу до місця встановлення зовнішнього блоку, довжини магістралі та особливостей об’єкта.",
  },
  {
    question: "Чи можна замовити тільки кондиціонер без монтажу?",
    answer:
      "Так, ви можете придбати кондиціонер окремо. Але якщо ви не впевнені у виборі моделі або потужності, краще залишити заявку на консультацію — ми допоможемо уникнути ситуації, коли кондиціонер виявиться занадто слабким або, навпаки, невиправдано потужним для вашого приміщення.",
  },
  {
    question: "Чим інверторний кондиціонер відрізняється від звичайного?",
    answer:
      "Інверторний кондиціонер плавно регулює потужність, тому працює тихіше, економніше та стабільніше підтримує температуру. Звичайні on/off моделі періодично вмикаються і вимикаються на повну потужність. Для щоденного використання в квартирі, будинку або офісі частіше обирають саме інверторні моделі.",
  },
  {
    question: "Чи потрібне технічне обслуговування кондиціонера?",
    answer:
      "Так, регулярне обслуговування допомагає зберегти ефективність роботи, зменшити навантаження на компресор і уникнути неприємного запаху, пилу та забруднень у внутрішньому блоці. Зазвичай профілактику рекомендують робити перед активним сезоном охолодження або після нього.",
  },
  {
    question: "Що входить у консультацію перед покупкою?",
    answer:
      "Ми уточнюємо площу та тип приміщення, ваші побажання до функцій, бюджету, рівня шуму, енергоефективності й умов монтажу. Після цього можемо запропонувати відповідні варіанти кондиціонерів і пояснити, чим вони відрізняються між собою.",
  },
  {
    question: "Як швидко зі мною зв’яжуться після відправки заявки?",
    answer:
      "Після відправки заявки ми зв’яжемося з вами у найближчий робочий час, уточнимо деталі та допоможемо визначити наступний крок: підбір моделі, узгодження монтажу або консультацію щодо сервісного обслуговування.",
  },
];

function FAQSection() {
  const [openedIndex, setOpenedIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenedIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="faq-section">
      <motion.div
        className="faq-section__head"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section_badge">FAQ</div>
        <h2 className="faq-section__title">Поширені запитання</h2>
        <p className="faq-section__subtitle">
          Зібрали відповіді на основні питання про підбір, купівлю, монтаж і
          технічне обслуговування кондиціонерів.
        </p>
      </motion.div>

      <div className="faq-section__list">
        {faqItems.map((item, index) => {
          const isOpen = openedIndex === index;

          return (
            <motion.div
              className={`faq-section__item ${isOpen ? "is-open" : ""}`}
              key={item.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.75,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                className="faq-section__question"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>

                <motion.span
                  className="faq-section__icon-wrap"
                  animate={{ rotate: isOpen ? -90 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="faq-section__icon"
                  />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-section__answer-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 0.25,
                      },
                    }}
                  >
                    <motion.div
                      className="faq-section__answer"
                      initial={{ y: -14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQSection;
