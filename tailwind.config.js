/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f3f2f9",
        primary: {
          DEFAULT: "#645FCF",
          text: "#06060d",
          chose: "#0f0f14"
        },
        secondary: "#cca6d8",
        accent: "#c27ec7",
      },
    },
  },
  plugins: [],
};
