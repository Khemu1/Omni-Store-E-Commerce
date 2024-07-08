/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        lato: ["lato"],
      },
      colors: {
        "mid-gray": "#353b48",
        "light-gray": "rgba(59,60,152,.03)",
        orangeish: "#F76C5B",
        "custom-navy": "#ff6f61",
      },
    },
  },
  plugins: [],
};
