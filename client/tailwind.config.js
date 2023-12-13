/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
          primary: "#ffffff", // Définissez ici la couleur de texte pour le mode sombre
          secondary: '#000000',
          info: "#f00"
        
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
