/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-main)",
        secondary: "var(--color-secondary)",
        light: "var(--color-light)",
        complementary: "var(--color-complementary)",
        info: "var(--color-info)",
        black_alpha: "var(--color-black-alpha)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
