/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
          300: "#FF8C01",
          400: "#FF7A01",
          500: "#FF7801",
          600: "#FF6601",
          700: "#FF5601",
          800: "#FF5201",
          900: "#FF5001",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        plight: ["Light", "sans-serif"],
        pregular: ["Regular", "sans-serif"],
        pbold: ["Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
