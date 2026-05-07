const CustomStylesForSelects = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "teal" : "#d0d5da",
    borderWidth: "2px",
    borderRadius: "15px",
    boxShadow: "none",
    padding: state.hasValue ? "2px 0px" : "2px 8px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      borderColor: "teal",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "rgb(0, 201, 201)" : "white",
    color: state.isSelected ? "white" : "black",
    padding: "5px 10px",
    borderRadius: "12px",
    "&:hover": {
      backgroundColor: "rgb(0, 201, 201)",
      color: "white",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#b0b0b0",
    fontSize: "14px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "rgb(107, 107, 107)",
    padding: "0 6px",
    fontSize: "16px",
    transition: "color 0.3s ease, font-weight 0.3s ease",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "teal",
    transition: "color 0.3s ease, transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(-90deg)" : "rotate(0deg)",
    "&:hover": {
      color: "rgb(0, 201, 201)",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#d0d5da",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "red",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    opacity: 1,
    transform: "scaleY(1)",
    transition: "opacity 0.4s ease, transform 0.4s ease",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    overflowY: "auto",
    maxHeight: "200px",
    boxSizing: "border-box",
    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "#f0f0f0",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#00caca",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#008b8b",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#00caca #f0f0f0",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgb(0, 202, 202)",
    borderRadius: "10px",
    padding: "2px 5px",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s ease, border-radius 0.3s ease",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
    fontWeight: "bold",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    marginLeft: "5px",
    padding: "2px",
    cursor: "pointer",
    transition:
      "color 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease",
    "&:hover": {
      color: "red",
      borderRadius: "50%",
    },
  }),
};

export default CustomStylesForSelects;
