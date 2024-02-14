/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        light: "var(--color-light)",
        complementary: "var(--color-complementary)",
        complementary2: "var(--color-complementary2)",
        info: "var(--color-info)",
        black_alpha: "var(--color-black-alpha)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        regime_0: "var(--color-regime-0)",
        regime_1: "var(--color-regime-1)",
        regime_100: "var(--color-regime-100)",
        regime_200: "var(--color-regime-200)",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
