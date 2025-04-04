/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        secondary2: "var(--color-secondary2)",
        secondary3: "var(--color-secondary3)",
        light: "var(--color-light)",
        complementary: "var(--color-complementary)",
        complementary2: "var(--color-complementary2)",
        complementary3: "var(--color-complementary3)",
        info: "var(--color-info)",
        black_alpha: "var(--color-black-alpha)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        wait: "var(--color-wait)",
        gold: "var(--color-gold)",
        regime_0: "var(--color-regime-0)",
        regime_1: "var(--color-regime-1)",
        regime_2: "var(--color-regime-100)",
        regime_3: "var(--color-regime-200)",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideInFromTop: "slideInFromTop 0.3s ease-in-out",
        slideInFromBottom: "slideInFromBottom 0.3s ease-in-out",
        spinSlow: "spin 3s linear infinite",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideInFromTop: {
          from: { transform: "translateY(-100px)" },
          to: { transform: "translateY(0)" },
        },
        slideInFromBottom: {
          from: { transform: "translateY(100px)" },
          to: { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
