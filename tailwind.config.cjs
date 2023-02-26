/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        flow: "flow 1s ease infinite alternate"
      },
      keyframes: {
        flow: {
          "0%": { top: "0px" },
          "100%": { top: "-30px" },
        }
      }
    },
  },
  plugins: [],
};
