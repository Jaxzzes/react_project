import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

function ProductFeatures({ features }) {
  const productFeaturesWithDescriptions = features.map((feature) => {
    let description = "";
    switch (feature.name) {
      case "Country of manufacture":
        description =
          "Indicates where the air conditioner was manufactured and assembled.";
        break;
      case "Recommended room area (sq.m.)":
        description =
          "Shows the room size for which the air conditioner can provide effective cooling or heating.";
        break;
      case "Type of compressor":
        description =
          "Defines the compressor technology, affecting energy efficiency, noise level, and temperature stability.";
        break;
      case "Warranty (months)":
        description =
          "Specifies how long the manufacturer covers repairs or replacement in case of defects.";
        break;
      case "Color":
        description = "Indicates the exterior color of the indoor AC unit.";
        break;
      case "Power consumption (kW)":
        description =
          "Displays how much electrical power the air conditioner uses during operation.";
        break;
      case "Minimum operating ambient temperature (deg)":
        description =
          "Lowest outdoor temperature at which the AC can run safely, usually in heating mode.";
        break;
      case "Maximum operating ambient temperature (deg)":
        description =
          "Highest outdoor temperature at which the AC can operate effectively, typically in cooling mode.";
        break;
      default:
        description = "No detailed description available for this option.";
    }
    return { ...feature, description };
  });

  const [openTooltip, setOpenTooltip] = useState(null);

  const toggleDescription = (featureName) => {
    setOpenTooltip(openTooltip === featureName ? null : featureName);
  };

  return (
    <div className="product-features">
      {productFeaturesWithDescriptions.map((feature, index) => (
        <div
          key={index}
          className={`table ${openTooltip === feature.name ? "open" : ""}`}
          data-tooltip={feature.tooltip}
        >
          <div className="name">{feature.name}:</div>
          <div className="value">
            <strong>{feature.value}</strong>
          </div>
          <div className="feature_tooltip_icon">
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="tooltip_icon"
              onClick={() => toggleDescription(feature.name)}
            />
          </div>
          <div className="tooltip">{feature.description}</div>
        </div>
      ))}
    </div>
  );
}

export default ProductFeatures;
