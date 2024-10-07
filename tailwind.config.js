/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutros-negro": "#434242",
        "neutros-negro-80": "#696868",
        "neutros-negro-50": "#b8b8b8",
        "neutros-blanco": "#ffffff",
        "primarios-violeta-100": "#7165d1",
        "primarios-celeste-100": "#496ceb",
        "neutral-color-gray-900": "#212121",
        "neutral-color-blue-gray-900": "#253237",
        "neutral-color-blue-gray-500": "#607d8a",
        "neutral-color-blue-gray-400": "#788f9c",
        "neutral-color-blue-gray-300": "#90a3ae",
        "neutral-color-blue-gray-100": "#cfd8dc",
        "neutral-color-blue-gray-50": "#eceff1",
        "gray-500": "#6a7280",
      },
      fontFamily: {
        "roboto-light": ["Roboto-Light", "sans-serif"],
        "roboto-regular": ["Roboto-Regular", "sans-serif"],
        "roboto-medium": ["Roboto-Medium", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
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
