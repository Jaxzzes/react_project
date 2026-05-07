import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-number-input";
import CustomStylesForSelects from "../components/addProduct/customStylesForSelects";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import "./services-form.css";

const ServicesForm = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [compressorType, setCompressorType] = useState(null);
  const [desiredDateTime, setDesiredDateTime] = useState(null);
  const [alternativeDateTime, setAlternativeDateTime] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const serviceOptions = [
    { value: "installation", label: "Installation" },
    { value: "maintenance", label: "Maintenance" },
    { value: "repair", label: "Repair" },
    { value: "diagnostics", label: "Diagnostics" },
  ];

  const compressorOptions = [
    { value: "inverter", label: "Inverter" },
    { value: "on-off", label: "On/Off" },
    { value: "cooling-only", label: "Cooling Only" },
  ];

  const minTime = new Date();
  minTime.setHours(9, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(18, 0, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedServices,
      brand,
      model,
      compressorType,
      desiredDateTime,
      alternativeDateTime,
      fullName,
      email,
      phoneNumber,
      address,
      description,
    });
  };

  return (
    <div className="services-form">
      <h2>Request a Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="wrapper-services-form">
          {/* Left Block */}
          <div className="left-service-block">
            <div className="form-group">
              <label>Select Services:</label>
              <Select
                isMulti
                options={serviceOptions}
                value={selectedServices}
                onChange={setSelectedServices}
                styles={CustomStylesForSelects}
                className="service-form-select"
                placeholder="Choose services..."
              />
            </div>
            <div className="form-group">
              <label>Brand:</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter air conditioner brand"
                className="service-form-input"
              />
            </div>
            <div className="form-group">
              <label>Model:</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter air conditioner model"
                className="service-form-input"
              />
            </div>
            <div className="form-group">
              <label>Compressor Type:</label>
              <Select
                options={compressorOptions}
                value={compressorType}
                onChange={setCompressorType}
                styles={CustomStylesForSelects}
                className="service-form-select"
                placeholder="Select compressor type..."
              />
            </div>
            <div className="form-group">
              <label>Desired Date & Time:</label>
              <DatePicker
                selected={desiredDateTime}
                onChange={(date) => setDesiredDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                dateFormat="MMMM d, yyyy h:mm aa"
                minTime={minTime}
                maxTime={maxTime}
                className="service-form-input"
                placeholderText="Select primary date and time"
              />
            </div>
            <div className="form-group">
              <label>Alternative Date & Time:</label>
              <DatePicker
                selected={alternativeDateTime}
                onChange={(date) => setAlternativeDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                dateFormat="MMMM d, yyyy h:mm aa"
                minTime={minTime}
                maxTime={maxTime}
                className="service-form-input"
                placeholderText="Select alternative date and time"
              />
            </div>
          </div>

          {/* Right Block */}
          <div className="right-service-block">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="service-form-input"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="service-form-input"
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="UA"
                international
                countryCallingCodeEditable={false}
                className="service-form-input"
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="service-form-input"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of the service required"
                className="service-form-textarea service-textarea"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="submit-block">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicesForm;
