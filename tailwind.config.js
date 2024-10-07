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
    },
  },
  plugins: [],
};
