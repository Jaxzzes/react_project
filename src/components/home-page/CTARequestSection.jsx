import React, { forwardRef, useMemo, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import { uk } from "date-fns/locale";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import "./CTARequestSection.css";
import RoomTypeSelect from "./RoomTypeSelect";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import axios from "axios";
import RequestStatusModal from "../modal/RequestStatusModal";

const CalendarInput = forwardRef(
  ({ value, onClick, onChange, placeholder }, ref) => {
    return (
      <div className="cta-form-field cta-form-field--calendar">
        <input
          ref={ref}
          type="text"
          value={value || ""}
          onClick={onClick}
          onChange={onChange}
          placeholder={placeholder}
          className="cta-form-input"
        />
        <button
          type="button"
          className="cta-calendar-button"
          onClick={onClick}
          aria-label="Відкрити календар"
        >
          <FaCalendarAlt />
        </button>
      </div>
    );
  },
);

CalendarInput.displayName = "CalendarInput";

function CTARequestSection() {
  const [requestType, setRequestType] = useState("purchase");
  const [roomAreaFocused, setRoomAreaFocused] = useState(false);
  const [acInputValue, setAcInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    text: "",
  });

  const airConditionerOptions = [
    { value: "Daikin Sensira", label: "Daikin Sensira" },
    { value: "Daikin Comfora", label: "Daikin Comfora" },
    { value: "Daikin Perfera", label: "Daikin Perfera" },

    {
      value: "Mitsubishi Electric MSZ-AP",
      label: "Mitsubishi Electric MSZ-AP",
    },
    {
      value: "Mitsubishi Electric MSZ-HR",
      label: "Mitsubishi Electric MSZ-HR",
    },
    {
      value: "Mitsubishi Electric MSZ-LN",
      label: "Mitsubishi Electric MSZ-LN",
    },

    { value: "Cooper&Hunter Veritas", label: "Cooper&Hunter Veritas" },
    { value: "Cooper&Hunter Arctic", label: "Cooper&Hunter Arctic" },
    { value: "Cooper&Hunter Supreme", label: "Cooper&Hunter Supreme" },

    { value: "Gree Bora", label: "Gree Bora" },
    { value: "Gree Muse", label: "Gree Muse" },
    { value: "Gree Pular", label: "Gree Pular" },
    { value: "Gree Amber", label: "Gree Amber" },

    { value: "TCL Elite", label: "TCL Elite" },
    { value: "TCL Ocarina", label: "TCL Ocarina" },
    { value: "TCL FreshIN", label: "TCL FreshIN" },

    { value: "Samsung Cebu", label: "Samsung Cebu" },
    { value: "Samsung WindFree", label: "Samsung WindFree" },

    { value: "LG Dual Inverter", label: "LG Dual Inverter" },
    { value: "LG Artcool", label: "LG Artcool" },

    { value: "Hisense Easy Smart", label: "Hisense Easy Smart" },
    { value: "Hisense Energy Pro", label: "Hisense Energy Pro" },

    { value: "Haier Flexis", label: "Haier Flexis" },
    { value: "Haier Tundra", label: "Haier Tundra" },

    { value: "Midea Blanc", label: "Midea Blanc" },
    { value: "Midea Xtreme Save", label: "Midea Xtreme Save" },

    { value: "Bosch Climate 3000i", label: "Bosch Climate 3000i" },
    { value: "Bosch Climate 5000i", label: "Bosch Climate 5000i" },

    { value: "Panasonic TZ", label: "Panasonic TZ" },
    { value: "Panasonic Etherea", label: "Panasonic Etherea" },

    { value: "Toshiba Seiya", label: "Toshiba Seiya" },
    { value: "Toshiba Haori", label: "Toshiba Haori" },

    { value: "Electrolux Portofino", label: "Electrolux Portofino" },
    { value: "Electrolux Fusion", label: "Electrolux Fusion" },

    { value: "Olmo Innova", label: "Olmo Innova" },
    { value: "Neoclima Therminator", label: "Neoclima Therminator" },
    { value: "Idea Pro", label: "Idea Pro" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      roomType: "",
      roomArea: "",
      description: "",
      existingUnit: "",
      preferredContactDate: null,
      serviceDate: null,
    },
  });

  const roomTypeOptions = [
    { value: "apartment", label: "Квартира" },
    { value: "house", label: "Приватний будинок" },
    { value: "office", label: "Офіс" },
    { value: "shop", label: "Магазин" },
    { value: "restaurant", label: "Кафе / ресторан" },
    { value: "salon", label: "Салон / студія" },
    { value: "warehouse", label: "Склад" },
    { value: "commercial", label: "Комерційне приміщення" },
    { value: "other", label: "Інше" },
  ];

  const now = useMemo(() => new Date(), []);

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const threeHoursLater = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 3, 0, 0, 0);
    return d;
  }, []);

  const workDayStartToday = useMemo(() => {
    const d = new Date();
    d.setHours(8, 0, 0, 0);
    return d;
  }, []);

  const workDayEndToday = useMemo(() => {
    const d = new Date();
    d.setHours(20, 0, 0, 0);
    return d;
  }, []);

  const effectiveMinDate = useMemo(() => {
    return threeHoursLater >= workDayEndToday ? tomorrow : todayStart;
  }, [threeHoursLater, workDayEndToday, tomorrow, todayStart]);

  const phoneValue = watch("phone");
  const roomAreaValue = useWatch({
    control,
    name: "roomArea",
  });

  const handleSwitchType = (type) => {
    setRequestType(type);
    clearErrors();
  };

  const formatDateTime = (value) => {
    if (!value) return "";

    const date = new Date(value);

    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const onSubmit = async (data) => {
    const payload =
      requestType === "purchase"
        ? {
            requestType: "purchase",
            fullName: data.fullName || "",
            phoneNumber: data.phone || "",
            roomType: data.roomTypeLabel || data.roomType || "",
            roomArea: data.roomArea || "",
            preferredContactDate: data.preferredContactDate
              ? formatDateTime(data.preferredContactDate)
              : "",
            description: data.description || "",
          }
        : {
            requestType: "service",
            fullName: data.fullName || "",
            phoneNumber: data.phone || "",
            existingUnit: data.existingUnit || "",
            serviceDate: data.serviceDate
              ? formatDateTime(data.serviceDate)
              : "",
            description: data.description || "",
          };

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:3000/api/send-cta-request",
        payload,
      );

      console.log("CTA request sent:", response.data);

      reset();
      setRequestType("purchase");
      setAcInputValue("");

      setStatusModal({
        isOpen: true,
        type: "success",
        title: "Запит успішно надіслано",
        text: "Дякуємо! Ми отримали вашу заявку та зв’яжемося з вами найближчим часом.",
      });
    } catch (error) {
      console.error("Error sending CTA request:", error);

      setStatusModal({
        isOpen: true,
        type: "error",
        title: "Не вдалося надіслати запит",
        text: "Сталася помилка під час надсилання форми. Спробуйте ще раз трохи пізніше.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinTimeForSelectedDate = (selectedDate) => {
    if (!selectedDate) return workDayStartToday;

    const selected = new Date(selectedDate);
    const selectedDay = new Date(selected);
    selectedDay.setHours(0, 0, 0, 0);

    const isToday = selectedDay.getTime() === todayStart.getTime();

    if (isToday) {
      return threeHoursLater > workDayStartToday
        ? threeHoursLater
        : workDayStartToday;
    }

    return workDayStartToday;
  };

  const getMaxTimeForSelectedDate = () => {
    return workDayEndToday;
  };

  const roomTypeSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "52px",
      borderRadius: "17px",

      border: state.menuIsOpen
        ? "2px solid teal"
        : "2px solid rgba(123, 123, 123, 0.1)",

      boxShadow:
        state.isFocused || state.menuIsOpen
          ? "0px 0px 8px 4px rgba(0, 0, 0, 0.1)"
          : "0 5px 3px 0 rgba(0, 0, 0, 0.1)",

      transition: "all 0.3s ease-in-out",

      "&:hover": {
        border: state.menuIsOpen
          ? "2px solid teal"
          : "2px solid rgba(123, 123, 123, 0.1)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 10px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#b0b0b0",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1f1f1f",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingRight: "14px",
      color: "teal",
    }),
    menu: (base) => ({
      ...base,
      marginTop: "8px",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 16px 34px rgba(0, 0, 0, 0.12)",
      zIndex: 30,
    }),
    menuList: (base) => ({
      ...base,
      padding: "8px",
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: "12px",
      padding: "12px 14px",
      backgroundColor: state.isFocused
        ? "rgba(0, 128, 128, 0.08)"
        : state.isSelected
          ? "teal"
          : "#fff",
      color: state.isSelected ? "#fff" : "#1f1f1f",
      cursor: "pointer",
    }),
  };

  const acSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "56px",
      borderRadius: "17px",
      border: state.isFocused
        ? "2px solid teal"
        : "2px solid rgba(123, 123, 123, 0.1)",
      boxShadow: state.isFocused
        ? "0 0 8px 4px rgba(0, 0, 0, 0.1)"
        : "0 5px 3px 0 rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease-in-out",
      backgroundColor: "#fff",
      "&:hover": {
        border: state.isFocused
          ? "2px solid teal"
          : "2px solid rgba(123, 123, 123, 0.1)",
        boxShadow: "0 0 8px 3px rgba(0, 0, 0, 0.1)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "6px 12px",
    }),
    input: (base) => ({
      ...base,
      fontSize: "18px",
      color: "#1f1f1f",
      margin: 0,
      padding: 0,
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "18px",
      color: "#b0b0b0",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "18px",
      color: "#1f1f1f",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "teal",
      paddingRight: "14px",
      transition: "all 0.3s ease-in-out",
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "#666",
    }),
    menu: (base) => ({
      ...base,
      marginTop: "8px",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 16px 34px rgba(0, 0, 0, 0.12)",
      zIndex: 40,
    }),
    menuList: (base) => ({
      ...base,
      padding: "8px",
      maxHeight: "240px",
      overscrollBehavior: "contain",
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: "12px",
      padding: "12px 14px",
      fontSize: "17px",
      backgroundColor: state.isFocused
        ? "rgba(0, 128, 128, 0.08)"
        : state.isSelected
          ? "teal"
          : "#fff",
      color: state.isSelected ? "#fff" : "#1f1f1f",
      cursor: "pointer",
    }),
  };

  const CalendarContainer = ({ className, children }) => {
    return (
      <div
        className={className}
        data-lenis-prevent-wheel
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    );
  };

  const AcMenuList = (props) => {
    return (
      <components.MenuList
        {...props}
        innerProps={{
          ...props.innerProps,
          onWheel: (e) => {
            e.stopPropagation();
          },
        }}
      />
    );
  };

  const AcDropdownIndicator = (props) => {
    const { menuIsOpen } = props.selectProps;

    return (
      <components.DropdownIndicator {...props}>
        <FaChevronDown
          className="cta-ac-select-arrow"
          style={{
            transform: menuIsOpen ? "rotate(-90deg)" : "rotate(0deg)",
          }}
        />
      </components.DropdownIndicator>
    );
  };

  const AcMenu = (props) => {
    return (
      <components.Menu {...props}>
        <div className="cta-ac-select-menu-animated">{props.children}</div>
      </components.Menu>
    );
  };

  return (
    <section className="cta-request-section">
      <div className="cta-request-container">
        <motion.div
          className="cta-request-head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="cta-request-label">Залишити заявку</span>
          <h2 className="cta-request-title">
            Підберемо кондиціонер або допоможемо з монтажем і сервісом
          </h2>
          <p className="cta-request-subtitle">
            Не можете обрати підходящий кондиціонер або ви вже придбали його але
            потребуєте у встановленні або технічному обслуговуванні? Оберіть
            потрібний варіант звернення та залиште заявку — ми зв’яжемося з вами
            у зручний для вас час.
          </p>
        </motion.div>

        <motion.div
          className="cta-request-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "0px 0px -120px 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cta-request-switcher">
            <button
              type="button"
              className={`cta-request-switcher-btn ${
                requestType === "purchase" ? "active" : ""
              }`}
              onClick={() => handleSwitchType("purchase")}
            >
              Підбір кондиціонера
            </button>

            <button
              type="button"
              className={`cta-request-switcher-btn ${
                requestType === "service" ? "active" : ""
              }`}
              onClick={() => handleSwitchType("service")}
            >
              Монтаж / сервіс
            </button>
          </div>

          <form className="cta-request-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="cta-form-grid">
              <div className="cta-form-field">
                <input
                  type="text"
                  placeholder="Ім’я та прізвище"
                  className="cta-form-input"
                  {...register("fullName", {
                    required: "Вкажіть ім’я та прізвище",
                    minLength: {
                      value: 3,
                      message: "Мінімум 3 символи",
                    },
                  })}
                />
                {errors.fullName && (
                  <span className="cta-form-error">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="cta-form-field">
                <PhoneInput
                  placeholder="Телефон"
                  value={phoneValue}
                  onChange={(value) =>
                    setValue("phone", value || "", { shouldValidate: true })
                  }
                  defaultCountry="UA"
                  international
                  countryCallingCodeEditable={false}
                  className="cta-phone-input"
                />
                {errors.phone && (
                  <span className="cta-form-error">{errors.phone.message}</span>
                )}
              </div>

              {requestType === "purchase" ? (
                <>
                  <div className="cta-form-field">
                    <Controller
                      control={control}
                      name="roomType"
                      rules={{
                        required: "Вкажіть тип приміщення",
                      }}
                      render={({ field }) => (
                        <RoomTypeSelect
                          options={roomTypeOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Тип приміщення"
                          error={!!errors.roomType}
                        />
                      )}
                    />

                    {errors.roomType && (
                      <span className="cta-form-error">
                        {errors.roomType.message}
                      </span>
                    )}
                  </div>

                  <div className="cta-form-field">
                    <div className="cta-number-field">
                      <button
                        type="button"
                        className="cta-number-btn"
                        onClick={() => {
                          const current =
                            roomAreaValue === "" || roomAreaValue === undefined
                              ? 0
                              : Number(roomAreaValue);

                          const nextValue = Math.max(0, current - 1);
                          setValue(
                            "roomArea",
                            nextValue === 0 ? "" : nextValue,
                            {
                              shouldValidate: true,
                            },
                          );
                        }}
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min={0}
                        max={1000}
                        step={1}
                        value={roomAreaValue}
                        className="cta-form-input cta-number-input"
                        placeholder={
                          roomAreaFocused
                            ? ""
                            : "Приблизна квадратура приміщення"
                        }
                        {...register("roomArea", {
                          validate: (value) => {
                            if (value === "" || value === undefined) {
                              return "Вкажіть площу приміщення";
                            }

                            const num = Number(value);

                            if (num < 0) return "Значення не може бути менше 0";
                            if (num > 1000)
                              return "Значення не може бути більше 1000";

                            return true;
                          },
                        })}
                        onFocus={() => setRoomAreaFocused(true)}
                        onBlur={() => setRoomAreaFocused(false)}
                        onChange={(e) => {
                          let value = e.target.value;

                          if (value === "") {
                            setValue("roomArea", "", { shouldValidate: true });
                            return;
                          }

                          let numericValue = Number(value);

                          if (Number.isNaN(numericValue)) numericValue = 0;
                          if (numericValue < 0) numericValue = 0;
                          if (numericValue > 1000) numericValue = 1000;

                          setValue("roomArea", numericValue, {
                            shouldValidate: true,
                          });
                        }}
                      />

                      <button
                        type="button"
                        className="cta-number-btn"
                        onClick={() => {
                          const current =
                            roomAreaValue === "" || roomAreaValue === undefined
                              ? 0
                              : Number(roomAreaValue);

                          const nextValue = Math.min(1000, current + 1);
                          setValue("roomArea", nextValue, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        +
                      </button>
                    </div>

                    {errors.roomArea && (
                      <span className="cta-form-error">
                        {errors.roomArea.message}
                      </span>
                    )}
                  </div>

                  <div className="cta-form-field cta-form-field--full">
                    <Controller
                      control={control}
                      name="preferredContactDate"
                      rules={{
                        required: "Оберіть зручну дату та час для зв’язку",
                      }}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          minDate={effectiveMinDate}
                          minTime={getMinTimeForSelectedDate(field.value)}
                          maxTime={getMaxTimeForSelectedDate()}
                          showTimeSelect
                          timeIntervals={30}
                          dateFormat="dd.MM.yyyy HH:mm"
                          timeFormat="HH:mm"
                          timeCaption="Час"
                          locale={uk}
                          placeholderText="Коли вам зручно, щоб з вами зв’язалися"
                          customInput={<CalendarInput />}
                          popperClassName="cta-datepicker-popper"
                          calendarClassName="cta-datepicker-calendar"
                          calendarContainer={CalendarContainer}
                          showPopperArrow={false}
                        />
                      )}
                    />
                    {errors.preferredContactDate && (
                      <span className="cta-form-error">
                        {errors.preferredContactDate.message}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="cta-form-field cta-form-field--full"
                    data-lenis-prevent-wheel
                  >
                    <Controller
                      control={control}
                      name="existingUnit"
                      rules={{
                        required: "Вкажіть марку та модель кондиціонера",
                      }}
                      render={({ field }) => (
                        <CreatableSelect
                          inputId="existingUnit"
                          classNamePrefix="cta-ac-select"
                          styles={acSelectStyles}
                          components={{
                            MenuList: AcMenuList,
                            DropdownIndicator: AcDropdownIndicator,
                            Menu: AcMenu,
                          }}
                          options={airConditionerOptions}
                          placeholder="Марка та модель кондиціонера"
                          isClearable
                          isSearchable
                          inputValue={acInputValue}
                          value={
                            field.value
                              ? { value: field.value, label: field.value }
                              : null
                          }
                          onInputChange={(newValue, actionMeta) => {
                            if (actionMeta.action === "input-change") {
                              setAcInputValue(newValue);
                            }

                            if (
                              actionMeta.action === "set-value" ||
                              actionMeta.action === "menu-close"
                            ) {
                              setAcInputValue("");
                            }
                          }}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.value || "");
                            setAcInputValue("");
                          }}
                          onCreateOption={(inputValue) => {
                            const trimmedValue = inputValue.trim();

                            if (trimmedValue) {
                              field.onChange(trimmedValue);
                              setAcInputValue("");
                            }
                          }}
                          onBlur={() => {
                            const trimmedValue = acInputValue.trim();

                            if (trimmedValue) {
                              field.onChange(trimmedValue);
                              setAcInputValue("");
                            }

                            field.onBlur();
                          }}
                          formatCreateLabel={(inputValue) =>
                            `Використати: "${inputValue}"`
                          }
                          noOptionsMessage={({ inputValue }) =>
                            inputValue
                              ? "Нічого не знайдено. Можна ввести вручну."
                              : "Почніть вводити марку або модель"
                          }
                        />
                      )}
                    />

                    {errors.existingUnit && (
                      <span className="cta-form-error">
                        {errors.existingUnit.message}
                      </span>
                    )}
                  </div>

                  <div className="cta-form-field cta-form-field--full">
                    <Controller
                      control={control}
                      name="serviceDate"
                      rules={{
                        required: "Оберіть бажану дату та час",
                      }}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          minDate={effectiveMinDate}
                          minTime={getMinTimeForSelectedDate(field.value)}
                          maxTime={getMaxTimeForSelectedDate()}
                          showTimeSelect
                          timeIntervals={30}
                          dateFormat="dd.MM.yyyy HH:mm"
                          timeFormat="HH:mm"
                          timeCaption="Час"
                          locale={uk}
                          placeholderText="Бажана дата та час для монтажу або сервісу"
                          customInput={<CalendarInput />}
                          popperClassName="cta-datepicker-popper"
                          calendarClassName="cta-datepicker-calendar"
                          calendarContainer={CalendarContainer}
                          showPopperArrow={false}
                        />
                      )}
                    />
                    {errors.serviceDate && (
                      <span className="cta-form-error">
                        {errors.serviceDate.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              <div className="cta-form-field cta-form-field--full">
                <textarea
                  placeholder={
                    requestType === "purchase"
                      ? "Опишіть ваш запит: побажання, бюджет, особливості приміщення"
                      : "Опишіть деталі заявки: монтаж, демонтаж або технічне обслуговування"
                  }
                  className="cta-form-textarea"
                  rows={5}
                  {...register("description", {
                    required: "Додайте короткий опис",
                  })}
                />
                {errors.description && (
                  <span className="cta-form-error">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            <div className="cta-form-actions">
              <button
                type="submit"
                className={`cta-form-submit ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="cta-form-submit-loader-wrap">
                    <span className="cta-form-submit-loader" />
                    Надсилання...
                  </span>
                ) : (
                  "Надіслати заявку"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      <RequestStatusModal
        isOpen={statusModal.isOpen}
        type={statusModal.type}
        title={statusModal.title}
        text={statusModal.text}
        onClose={() =>
          setStatusModal((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />
    </section>
  );
}

export default CTARequestSection;
