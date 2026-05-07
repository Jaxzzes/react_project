import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./CTARequestSection.css";

function RoomTypeSelect({
  options,
  value,
  onChange,
  placeholder = "Тип приміщення",
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsHeight, setOptionsHeight] = useState(0);
  const optionsRef = useRef(null);
  const wrapperRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (optionsRef.current) {
      setOptionsHeight(optionsRef.current.scrollHeight + 6);
    }
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`cta-custom-select ${isOpen ? "open" : ""} ${error ? "error" : ""}`}
      data-lenis-prevent-wheel
    >
      <div className="cta-custom-select__container">
        <button
          type="button"
          className="cta-custom-select__selected"
          onClick={handleToggle}
          aria-expanded={isOpen}
        >
          <span className={selectedOption ? "selected" : "placeholder"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <FaChevronDown className="cta-custom-select__arrow" />
        </button>

        <ul
          className={`cta-custom-select__options ${isOpen ? "open" : ""}`}
          ref={optionsRef}
          style={{
            maxHeight: isOpen ? `${Math.min(optionsHeight, 260)}px` : "0px",
          }}
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`cta-custom-select__option ${
                option.value === value ? "active" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoomTypeSelect;
