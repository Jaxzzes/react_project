import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../forms/purchase-form.css";

function PurchaseForm({ brandName, model }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const defaultDescription = `Hello, I am interested in ${brandName} ${model} air conditioner. I would like to consult with you to know the details of the purchase and other nuances related to it. Thank you!`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `Submit info:\nFull name: ${fullName}\nPhone: ${phoneNumber}\nEmail: ${email}\nDescription: ${description}`,
    );
    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-email",
        {
          fullName,
          phoneNumber,
          email,
          brandName,
          model,
          description,
        },
      );
      console.log("Email sent:", response.data);
      console.log("Your purchase form has been submitted successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      console.log(
        "Failed to submit the purchase form. Please try again later.",
      );
    }

    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setDescription("");
  };

  return (
    <div className="purchase-form">
      <h2>Purchase Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="wrapper-form">
          <div className="left-contact-block-form">
            <div className="form-group">
              <div className="label">
                <label htmlFor="fullName">
                  Full Name: <span className="required-symbol">*</span>
                </label>
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setFullNameFocused(true)}
                onBlur={() => setFullNameFocused(false)}
                placeholder={fullNameFocused ? "" : "John Doe"}
                required
              />
            </div>
            <div className="form-group">
              <div className="label">
                <label htmlFor="phoneNumber">
                  Phone: <span className="required-symbol">*</span>
                </label>
              </div>
              {/* <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setPhoneNumberFocused(true)}
                onBlur={() => setPhoneNumberFocused(false)}
                placeholder={phoneNumberFocused ? "" : "+380 (XX) 123 45 67"}
                required
              /> */}
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value || "")}
                defaultCountry="UA"
                international
                countryCallingCodeEditable={false}
                className="product-modal-input"
              />
            </div>
            <div className="form-group">
              <div className="label">
                <label htmlFor="email">Email:</label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder={emailFocused ? "" : "example@example.com"}
                required
              />
            </div>
          </div>
          <div className="right-descr-block-form">
            <div className="form-group">
              <div className="label">
                <label htmlFor="description">
                  Description: <span className="required-symbol">*</span>
                </label>
              </div>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setDescriptionFocused(true)}
                onBlur={() => setDescriptionFocused(false)}
                placeholder={descriptionFocused ? "" : defaultDescription}
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div className="submit-block">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PurchaseForm;
