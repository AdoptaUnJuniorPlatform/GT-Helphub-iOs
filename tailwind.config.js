/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutros-negro": "#434242",
        "neutros-negro-80": "#696868",
        "neutros-negro-50": "#b8b8b8",
        "neutros-negro-6": "rgba(174, 174, 174, 0.1)",
        "neutros-beige-fondo": "#f6f5f4",
        "neutros-gris-fondo": "#fafafa",
        "neutros-blanco": "#fbfbff",
        "primarios-rosa-100": "#D2298E",
        "primarios-violeta-100": "#7166d2",
        "primarios-violeta-20": "rgba(113, 102, 210, 0.2)",
        "primarios-celeste-100": "#496ceb",
        "primarios-celeste-20": "rgba(73, 108, 235, 0.2)",
        "primarios-azul-100": "#1945e2",
        "terciario-verde-fondo": "#EDF7ED",
        "terciario-verde": "#43A047",
        "terciario-verde-oscuro": "#4B6C4C",
        "terciario-celeste": "#E5F6FD",
        "terciario-celeste-oscuro": "#C8DBE5",
        "terciario-celeste-muy-oscuro": "#0F547A",
        "neutral-color-gray-900": "#212121",
        "neutral-color-blue-gray-900": "#253237",
        "neutral-color-blue-gray-500": "#607d8b",
        "neutral-color-blue-gray-400": "#788f9c",
        "neutral-color-blue-gray-300": "#90a3ae",
        "neutral-color-blue-gray-100": "#cfd8dc",
        "neutral-color-blue-gray-50": "#eceff1",
        "gray-500": "#6a7280",
      },
      fontFamily: {
        "roboto-light": ["Roboto-Light", "sans-serif"],
        "roboto-regular": ["Roboto-Regular", "sans-serif"],
        "roboto-italic": ["Roboto-Italic", "sans-serif"],
        "roboto-medium": ["Roboto-Medium", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-semibold": ["Poppins-Semibold", "sans-serif"],
      },
      fontSize: {
        h1: [
          "96px",
          {
            letterSpacing: "-1.5px",
            fontWeight: "300",
          },
        ],
        h2: [
          "60px",
          {
            letterSpacing: "-0.5px",
            fontWeight: "300",
          },
        ],
        h3: [
          "48px",
          {
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        h: [
          "34px",
          {
            letterSpacing: "0.25px",
            fontWeight: "400",
          },
        ],
        h5: [
          "24px",
          {
            letterSpacing: "0px",
            fontWeight: "400",
          },
        ],
        h6: [
          "20px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        subtitle1: [
          "16px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        subtitle2: [
          "14px",
          {
            letterSpacing: "0px",
            fontWeight: "500",
          },
        ],
        body1: [
          "16px",
          {
            letterSpacing: "0.5px",
            fontWeight: "400",
          },
        ],
        body2: [
          "14px",
          {
            letterSpacing: "0.25px",
            fontWeight: "400",
          },
        ],
        boton: [
          "14px",
          {
            letterSpacing: "1.25px",
            fontWeight: "400",
          },
        ],
        caption: [
          "12px",
          {
            letterSpacing: "0.4px",
            fontWeight: "400",
          },
        ],
        overline: [
          "10px",
          {
            letterSpacing: "1.5px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
