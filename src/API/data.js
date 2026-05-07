import { v4 as uuidv4 } from "uuid";

export const products = [
  {
    id: uuidv4(),
    brandName: "Hisense",
    model: "Perla",
    description: "This is the description for Hisense Perla.",
    shortDescription: "This is the short description for Hisense Perla.",
    categories: ["Split"],
    price: 19.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
        tooltip:
          "The country of origin indicates the place where the product was manufactured. Knowing the country of origin can help you make an informed purchasing decision, taking into account specific manufacturing standards, quality, etc.",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "25",
        tooltip:
          "Please note that using the air conditioner outside its recommended area may result in discomfort in the room or, in the worst case, equipment failure.",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
        tooltip:
          "Inverted type of compressor - allows the air conditioner to work both for cooling and heating.",
      },
      {
        name: "Warranty (months)",
        value: "36",
        tooltip:
          "During this period, we will repair any defects (which are covered by the warranty) at our expense or refund the full amount of the price of the goods.",
      },
      {
        name: "Color",
        value: "White",
        tooltip:
          "The color of the indoor unit of the air conditioner. The outdoor unit is white as standard, but the color may vary depending on the product model.",
      },
      {
        name: "Power consumption (kW)",
        value: "0.855",
        tooltip:
          "This is the average power consumption of this product when the air conditioner load is low.",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
        tooltip:
          "Minimum ambient temperature for correct operation of the air conditioner. In case the air conditioner is of inverter type, take into account that this value refers to the air conditioner operation in 'heating' mode, and in 'cooling' mode the value can be much higher.",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "45",
        tooltip:
          "Maximum ambient temperature for correct operation of the air conditioner. In case the air conditioner is of inverter type, please note that this value refers to the operation of the air conditioner in 'cooling' mode, and in 'heating' mode the value can be much less.",
      },
    ],
    options: [
      {
        name: "7 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username 1",
        description: "Reviews description 1",
        rating: 1,
        datePublication: "2024-04-12T10:30:00",
      },
      {
        id: "",
        username: "Username 2",
        description: "Reviews description 2",
        rating: 4,
        datePublication: "2022-04-12T14:15:00",
      },
      {
        id: "",
        username: "Username 3",
        description: "Reviews description 3",
        rating: 3,
        datePublication: "2023-02-12T18:45:00",
      },
      {
        id: "",
        username: "Username 4",
        description: "Reviews description 4",
        rating: 5,
        datePublication: "2021-01-12T08:00:00",
      },
    ],
    images: [
      "/images/hisense-perla.jpg",
      "/images/hisense-perla2.jpg",
      "/images/hisense-perla3.jpg",
      "/images/hisense-perla4.jpg",
      "/images/hisense-perla5.jpg",
      "/images/hisense-perla6.jpg",
      "/images/hisense-perla7.jpg",
      "/images/hisense-perla8.jpg",
    ],
  },
  {
    id: uuidv4(),
    brandName: "Hisense",
    model: "Apple Pie",
    description: "This is the description for Hisense Apple Pie.",
    shortDescription: "This is the short description for Hisense Apple Pie.",
    categories: ["Invertor"],
    price: 29.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "35",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "36",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "1.000",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-25",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "43",
      },
    ],
    options: [
      {
        name: "5 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product2-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Hisense",
    model: "Silentium PRO",
    description: "This is the description for Hisense Silentium PRO.",
    shortDescription:
      "This is the short description for Hisense Silentium PRO.",
    categories: ["Split"],
    price: 39.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "35",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "36",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.790",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-30",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "43",
      },
    ],
    options: [
      {
        name: "5 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product3-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Hisense",
    model: "Energy PRO",
    description: "This is the description for Hisense Energy PRO.",
    shortDescription: "This is the short description for Hisense Energy PRO.",
    categories: ["Split"],
    price: 49.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "30",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "36",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.900",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-20",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "43",
      },
    ],
    options: [
      {
        name: "5 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product4-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Hisense",
    model: "Easy Pure",
    description: "This is the description for Hisense Easy Pure.",
    shortDescription: "This is the short description for Hisense Easy Pure.",
    categories: ["Split"],
    price: 59.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "70",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "36",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "2.100",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-20",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "43",
      },
    ],
    options: [
      {
        name: "7 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product5-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Hisense",
    model: "Fresh Master",
    description: "This is the description for Hisense Fresh Master.",
    shortDescription: "This is the short description for Hisense Fresh Master.",
    categories: ["Split"],
    price: 69.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "35",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "36",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.790",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-30",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "43",
      },
    ],
    options: [
      {
        name: "7 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product6-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Hisense",
    model: "Energy PRO Plus",
    description: "This is the description for Hisense Energy PRO Plus.",
    shortDescription:
      "This is the short description for Hisense Energy PRO Plus.",
    categories: ["Split"],
    price: 79.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Japan",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "15",
      },
      {
        name: "Type of compressor",
        value: "Cooling only",
      },
      {
        name: "Warranty (months)",
        value: "36",
      },
      {
        name: "Color",
        value: "Black",
      },
      {
        name: "Power consumption (kW)",
        value: "0.690",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "30",
      },
    ],
    options: [
      {
        name: "4 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product7-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Midea",
    model: "Blanc",
    description: "This is the description for Midea Blanc.",
    shortDescription: "This is the short description for Midea Blanc.",
    categories: ["Invertor"],
    price: 89.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Japan",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "35",
      },
      {
        name: "Type of compressor",
        value: "Cooling only",
      },
      {
        name: "Warranty (months)",
        value: "36",
      },
      {
        name: "Color",
        value: "Black",
      },
      {
        name: "Power consumption (kW)",
        value: "0.690",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "30",
      },
    ],
    options: [
      {
        name: "4 indoor unit fan speeds",
        description: "Reduces the noise level of operation.",
      },
      {
        name: "I Feel",
        description:
          "Precise temperature control near the user, the remote control has a sensor that reads the temperature nearby.",
      },
      {
        name: "Control horizontal blinds",
        description:
          "Ability to control horizontal blinds from the remote control.",
      },
      {
        name: "SUPER (Turbo) mode",
        description: "Fast cooling, power increases by 25%.",
      },
      {
        name: "SLEEP mode",
        description: 'Activates the "Sleep" mode.',
      },
      {
        name: "QUIET mode",
        description:
          "Activates the extra quiet mode, the noise level is only 22 dB.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "SMART mode",
        description:
          "Automatically adjusts the power based on the room temperature.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product8-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Midea",
    model: "Forest",
    description: "This is the description for Midea Forest.",
    shortDescription: "This is the short description for Midea Forest.",
    categories: ["Invertor"],
    price: 99.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "22",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "24",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.110",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "50",
      },
    ],
    options: [
      {
        name: "Cleaning",
        description:
          "Active Clean technology washes away dust, mold and grease that can cause odor.",
      },
      {
        name: "Night mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Follow me",
        description:
          "When this function is enabled on the remote controller, the control processor of the indoor unit will receive room temperature data from the temperature sensor installed in the remote controller",
      },
      {
        name: "Turbo mode",
        description:
          'Turbo" function - when this mode is switched on, the air conditioner performs cooling or heating as fast as possible.',
      },
      {
        name: "Blue Fin",
        description:
          "Corrosion protection. Special anti-corrosion coating of the heat exchanger, protecting it from weathering and aggressive external environment.",
      },
      {
        name: "Compressor DC Inverter",
        description:
          "DC inverter compressor allows you to maximize the efficiency of your air conditioner.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: 'Outdoor unit of the "Diamond" design',
        description:
          "Midea designers have not forgotten about the appearance of the casing of the outdoor unit of the air conditioner, which in itself is a rarity for climate technology.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product9-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Midea",
    model: "Mission II",
    description: "This is the description for Midea Mission II.",
    shortDescription: "This is the short description for Midea Mission II.",
    categories: ["Invertor"],
    price: 109.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "35",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "24",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.960",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-25",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "30",
      },
    ],
    options: [
      {
        name: "Cleaning",
        description:
          "Active Clean technology washes away dust, mold and grease that can cause odor.",
      },
      {
        name: "Night mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Refrigerant leak detection",
        description:
          'If a refrigerant leakage is detected, the indoor unit display will show the error code "EC".',
      },
      {
        name: "Turbo mode",
        description:
          'Turbo" function - when this mode is switched on, the air conditioner performs cooling or heating as fast as possible.',
      },
      {
        name: "Blue Fin",
        description:
          "Corrosion protection. Special anti-corrosion coating of the heat exchanger, protecting it from weathering and aggressive external environment.",
      },
      {
        name: "Compressor DC Inverter",
        description:
          "DC inverter compressor allows you to maximize the efficiency of your air conditioner.",
      },
      {
        name: "Timer",
        description:
          "You can program the air conditioner to turn on and off, which allows you to prepare a comfortable room temperature in advance.",
      },
      {
        name: "Monitoring and control via Wi-Fi (Option)",
        description:
          "Midea RAC has developed a mobile app for modern smartphones that acts as a remote control - via Wi-Fi connection (Wi-Fi is optional for some series).",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product10-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Midea",
    model: "Xtreme II",
    description: "This is the description for Midea Xtreme II.",
    shortDescription: "This is the short description for Midea Xtreme II.",
    categories: ["Invertor"],
    price: 119.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "45",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "24",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.900",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "50",
      },
    ],
    options: [
      {
        name: "Cleaning",
        description:
          "Active Clean technology washes away dust, mold and grease that can cause odor.",
      },
      {
        name: "Night mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Refrigerant leak detection",
        description:
          'If a refrigerant leakage is detected, the indoor unit display will show the error code "EC".',
      },
      {
        name: "Turbo mode",
        description:
          'Turbo" function - when this mode is switched on, the air conditioner performs cooling or heating as fast as possible.',
      },
      {
        name: "Blue Fin",
        description:
          "Corrosion protection. Special anti-corrosion coating of the heat exchanger, protecting it from weathering and aggressive external environment.",
      },
      {
        name: "Compressor DC Inverter",
        description:
          "DC inverter compressor allows you to maximize the efficiency of your air conditioner.",
      },
      {
        name: 'Outdoor unit of the "Diamond" design',
        description:
          "Midea designers have not forgotten about the appearance of the casing of the outdoor unit of the air conditioner, which in itself is a rarity for climate technology.",
      },
      {
        name: "Monitoring and control via Wi-Fi (Option)",
        description:
          "Midea RAC has developed a mobile app for modern smartphones that acts as a remote control - via Wi-Fi connection (Wi-Fi is optional for some series).",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product1-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Midea",
    model: "Aurora",
    description: "This is the description for Midea Aurora.",
    shortDescription: "This is the short description for Midea Aurora.",
    categories: ["Invertor"],
    price: 129.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "30",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "24",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "1.080",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-27",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "50",
      },
    ],
    options: [
      {
        name: "Cleaning",
        description:
          "Active Clean technology washes away dust, mold and grease that can cause odor.",
      },
      {
        name: "Night mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Refrigerant leak detection",
        description:
          'If a refrigerant leakage is detected, the indoor unit display will show the error code "EC".',
      },
      {
        name: "Eco mode",
        description:
          'When using "Eco" function - the air conditioner will cool your room quickly and will automatically maintain t=+24°C and AUTO fan speed.',
      },
      {
        name: "Follow me",
        description:
          "When this function is enabled on the remote controller, the control processor of the indoor unit will receive room temperature data from the temperature sensor installed in the remote controller",
      },
      {
        name: "Compressor DC Inverter",
        description:
          "DC inverter compressor allows you to maximize the efficiency of your air conditioner.",
      },
      {
        name: 'Outdoor unit of the "Diamond" design',
        description:
          "Midea designers have not forgotten about the appearance of the casing of the outdoor unit of the air conditioner, which in itself is a rarity for climate technology.",
      },
      {
        name: "Monitoring and control via Wi-Fi (Option)",
        description:
          "Midea RAC has developed a mobile app for modern smartphones that acts as a remote control - via Wi-Fi connection (Wi-Fi is optional for some series).",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product2-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Midea",
    model: "Mission",
    description: "This is the description for Midea Mission.",
    shortDescription: "This is the short description for Midea Mission.",
    categories: ["Invertor"],
    price: 139.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "22",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "24",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.110",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-30",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "40",
      },
    ],
    options: [
      {
        name: "Cleaning",
        description:
          "Active Clean technology washes away dust, mold and grease that can cause odor.",
      },
      {
        name: "Night mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Heat exchanger with increased heat output",
        description:
          'Increased heat output. The units use heat exchangers with specially designed tubes, the inner surface of which has trapezoidal "Innergrove cooper" notches.',
      },
      {
        name: "Air drying mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Temperature compensation",
        description:
          "The temperature compensation function corrects the temperature in the area where the person is located to a comfortable temperature (as the air temperature near the floor and ceiling may differ by severalrees).",
      },
      {
        name: "Compressor DC Inverter",
        description:
          "DC inverter compressor allows you to maximize the efficiency of your air conditioner.",
      },
      {
        name: 'Outdoor unit of the "Diamond" design',
        description:
          "Midea designers have not forgotten about the appearance of the casing of the outdoor unit of the air conditioner, which in itself is a rarity for climate technology.",
      },
      {
        name: "Monitoring and control via Wi-Fi (Option)",
        description:
          "Midea RAC has developed a mobile app for modern smartphones that acts as a remote control - via Wi-Fi connection (Wi-Fi is optional for some series).",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product3-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Midea",
    model: "Nordic",
    description: "This is the description for Midea Nordic.",
    shortDescription: "This is the short description for Midea Nordic.",
    categories: ["Invertor"],
    price: 149.99,
    features: [
      {
        name: "Country of manufacture",
        value: "China",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "22",
      },
      {
        name: "Type of compressor",
        value: "Inverter",
      },
      {
        name: "Warranty (months)",
        value: "24",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.900",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-28",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "50",
      },
    ],
    options: [
      {
        name: "Cleaning",
        description:
          "Active Clean technology washes away dust, mold and grease that can cause odor.",
      },
      {
        name: "Night mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Heat exchanger with increased heat output",
        description:
          'Increased heat output. The units use heat exchangers with specially designed tubes, the inner surface of which has trapezoidal "Innergrove cooper" notches.',
      },
      {
        name: "Air drying mode",
        description:
          "Dehumidification mode automatically selects a cooling mode based on the difference between the set temperature and the actual room temperature.",
      },
      {
        name: "Temperature compensation",
        description:
          "The temperature compensation function corrects the temperature in the area where the person is located to a comfortable temperature (as the air temperature near the floor and ceiling may differ by severalrees).",
      },
      {
        name: "Compressor DC Inverter",
        description:
          "DC inverter compressor allows you to maximize the efficiency of your air conditioner.",
      },
      {
        name: 'Outdoor unit of the "Diamond" design',
        description:
          "Midea designers have not forgotten about the appearance of the casing of the outdoor unit of the air conditioner, which in itself is a rarity for climate technology.",
      },
      {
        name: "Monitoring and control via Wi-Fi (Option)",
        description:
          "Midea RAC has developed a mobile app for modern smartphones that acts as a remote control - via Wi-Fi connection (Wi-Fi is optional for some series).",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product4-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Daikin",
    model: "Perfera",
    description: "This is the description for Daikin Perfera.",
    shortDescription: "This is the short description for Daikin Perfera.",
    categories: ["Split"],
    price: 159.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Czech",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "20",
      },
      {
        name: "Type of compressor",
        value: "On/Off",
      },
      {
        name: "Warranty (months)",
        value: "12",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.500",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-20",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "50",
      },
    ],
    options: [
      {
        name: "Heat Booster",
        description:
          "Quickly heats the room when the air conditioner is switched on. The set temperature is reached 14% faster than with a conventional air conditioner (steam system only)",
      },
      {
        name: "Flash Streamer",
        description:
          "Using electrons to trigger chemical reactions with airborne particles, the Flash Streamer breaks down allergens such as pollen and fungal allergens and removes unpleasant odors for cleaner, higher quality air.",
      },
      {
        name: "Silver filter",
        description:
          "For air purification and allergen removal: captures allergens such as pollen, ensuring a steady supply of clean air.",
      },
      {
        name: "Daikin Residential controller",
        description:
          "Control your indoor climate from anywhere using your smartphone or tablet.",
      },
      {
        name: "Voice control",
        description:
          "Via Amazon Alexa or Google Assistant, basic functions such as setpoint, operating mode, fan speed, etc.",
      },
      {
        name: "Quiet operation",
        description: "Sound pressure level up to 19 dBA.",
      },
      {
        name: "Uniform airflow distribution function throughout the space",
        description:
          "Allows you to use a combination of horizontal and vertical louver change to circulate warm or cool airflow even in remote corners of the room.",
      },
      {
        name: "2-zone motion sensor",
        description:
          "Airflow is directed to an area where there are no people in the room at that moment; if there are no people in the room, the unit automatically switches to energy efficient mode. (higher performance area).",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product5-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Daikin",
    model: "Stylish",
    description: "This is the description for Daikin Stylish.",
    shortDescription: "This is the short description for Daikin Stylish.",
    categories: ["Invertor"],
    price: 169.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Czech",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "20",
      },
      {
        name: "Type of compressor",
        value: "On/Off",
      },
      {
        name: "Warranty (months)",
        value: "12",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.470",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "46",
      },
    ],
    options: [
      {
        name: "Flash Streamer",
        description:
          "Using electrons to trigger chemical reactions with airborne particles, the Flash Streamer breaks down allergens such as pollen and fungal allergens and removes unpleasant odors for cleaner, higher quality air.",
      },
      {
        name: "Daikin Residential controller",
        description:
          "Control your indoor climate from anywhere using your smartphone or tablet.",
      },
      {
        name: "Virtually silent",
        description:
          "the unit runs so quietly, it doesnt make its presence felt.",
      },
      {
        name: "Uniform airflow distribution function throughout the space",
        description:
          "Allows you to use a combination of horizontal and vertical louver change to circulate warm or cool airflow even in remote corners of the room.",
      },
      {
        name: "Choosing an R-32 system",
        description:
          "Reduces the environmental impact by 68% compared to R-410A and directly reduces energy consumption thanks to its high energy efficiency",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product6-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Daikin",
    model: "Emura",
    description: "This is the description for Daikin Emura.",
    shortDescription: "This is the short description for Daikin Emura.",
    categories: ["Invertor"],
    price: 179.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Belgium",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "35",
      },
      {
        name: "Type of compressor",
        value: "On/Off",
      },
      {
        name: "Warranty (months)",
        value: "12",
      },
      {
        name: "Color",
        value: "Silver",
      },
      {
        name: "Power consumption (kW)",
        value: "0.600",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-10",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "40",
      },
    ],
    options: [
      {
        name: "Test option 1",
        description: "Description for test options 1",
      },
      {
        name: "Test option 2",
        description: "Description for test options 2",
      },
      {
        name: "Test option 3",
        description: "Description for test options 3",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product7-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Daikin",
    model: "Ururu Sarara",
    description: "This is the description for Daikin Ururu Sarara.",
    shortDescription: "This is the short description for Daikin Ururu Sarara.",
    categories: ["Invertor"],
    price: 189.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Japan",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "28",
      },
      {
        name: "Type of compressor",
        value: "On/Off",
      },
      {
        name: "Warranty (months)",
        value: "12",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "1.200",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-20",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "25",
      },
    ],
    options: [
      {
        name: "Night operation mode",
        description:
          "An energy-saving mode that prevents overcooling or overheating at night.",
      },
      {
        name: "Comfort mode",
        description:
          "Ensures draught-free operation by preventing warm or cold air from blowing directly onto people.",
      },
      {
        name: "High performance mode",
        description:
          "Can be used to quickly heat or cool a room; after leaving high performance mode, the unit returns to the previously set mode.",
      },
      {
        name: "Automatic cooling/heating mode switching",
        description:
          "Automatically selects cooling or heating mode to maintain the set temperature.",
      },
      {
        name: "Quiet operation.",
        description:
          "Daikin indoor units are virtually silent. Outdoor units will never disturb your neighbors.",
      },
      {
        name: "Comfort Sleep Mode",
        description:
          "A comfort function that ensures that the unit operates according to a specific rhythm of temperature changes in the room",
      },
      {
        name: "Uniform distribution of airflow throughout the space.",
        description:
          "The three-directional airflow function allows a combination of horizontal and vertical movement of the louvered grille to circulate cold/warm airflow even in remote corners of large rooms.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product8-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Daikin",
    model: "FTXF25/RXF25",
    description: "This is the description for Daikin FTXF25/RXF25.",
    shortDescription: "This is the short description for Daikin FTXF25/RXF25.",
    categories: ["Invertor", "Test category"],
    price: 199.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Turkey",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "25",
      },
      {
        name: "Type of compressor",
        value: "On/Off",
      },
      {
        name: "Warranty (months)",
        value: "12",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.770",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "46",
      },
    ],
    options: [
      {
        name: "Econo mode",
        description:
          "This mode reduces power consumption, allowing you to use other appliances with high power consumption at the same time. This function also provides energy saving.",
      },
      {
        name: "Comfort mode",
        description:
          "Ensures draught-free operation by preventing warm or cold air from blowing directly onto people.",
      },
      {
        name: "High performance mode",
        description:
          "Can be used to quickly heat or cool a room; after leaving high performance mode, the unit returns to the previously set mode.",
      },
      {
        name: "Automatic cooling/heating mode switching",
        description:
          "Automatically selects cooling or heating mode to maintain the set temperature.",
      },
      {
        name: "Quiet operation.",
        description:
          "Daikin indoor units are virtually silent. Outdoor units will never disturb your neighbors.",
      },
      {
        name: "Energy efficiency in standby mode",
        description:
          "Standby power consumption is reduced by approximately 80%.",
      },
      {
        name: "Ventilation mode",
        description:
          "The air conditioner can be used in ventilation mode to create air flow without cooling or heating.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product9-image1.jpg"],
  },
  {
    id: uuidv4(),
    brandName: "Daikin",
    model: "FTXF20/RXF20",
    description: "This is the description for Daikin FTXF20/RXF20.",
    shortDescription: "This is the short description for Daikin FTXF20/RXF20.",
    categories: ["Invertor", "Test category"],
    price: 209.99,
    features: [
      {
        name: "Country of manufacture",
        value: "Turkey",
      },
      {
        name: "Recommended room area (sq.m.)",
        value: "20",
      },
      {
        name: "Type of compressor",
        value: "On/Off",
      },
      {
        name: "Warranty (months)",
        value: "12",
      },
      {
        name: "Color",
        value: "White",
      },
      {
        name: "Power consumption (kW)",
        value: "0.770",
      },
      {
        name: "Minimum operating ambient temperature (deg)",
        value: "-15",
      },
      {
        name: "Maximum operating ambient temperature (deg)",
        value: "46",
      },
    ],
    options: [
      {
        name: "Wi-Fi module",
        description:
          "Possibility to connect a Wi-Fi module (module not included)",
      },
      {
        name: "Comfort mode",
        description:
          "Ensures draught-free operation by preventing warm or cold air from blowing directly onto people.",
      },
      {
        name: "High performance mode",
        description:
          "Can be used to quickly heat or cool a room; after leaving high performance mode, the unit returns to the previously set mode.",
      },
      {
        name: "Automatic cooling/heating mode switching",
        description:
          "Automatically selects cooling or heating mode to maintain the set temperature.",
      },
      {
        name: "Quiet operation.",
        description:
          "Daikin indoor units are virtually silent. Outdoor units will never disturb your neighbors.",
      },
      {
        name: "Energy efficiency in standby mode",
        description:
          "Standby power consumption is reduced by approximately 80%.",
      },
      {
        name: "Ventilation mode",
        description:
          "The air conditioner can be used in ventilation mode to create air flow without cooling or heating.",
      },
    ],
    reviews: [
      {
        id: "",
        username: "Username Reviews",
        description: "Reviews description",
        rating: 5,
        datePublication: "12.03.2024",
      },
    ],
    images: ["https://example.com/product10-image1.jpg"],
  },
];

products.forEach((product) => {
  product.reviews.forEach((review) => {
    review.id = uuidv4();
  });
});
