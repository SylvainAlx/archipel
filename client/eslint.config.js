import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // S'applique à tous les fichiers JS/TS
    ignores: ["dist", "dev-dist"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": ts,
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect", // Auto-détection de la version de React
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Récupère les règles de base JS
      ...ts.configs.recommended.rules, // Ajoute les recommandations TS
      ...react.configs.recommended.rules, // Ajoute les recommandations React
      ...reactHooks.configs.recommended.rules, // Ajoute les recommandations React Hooks
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off", // Plus nécessaire avec React 17+
      "react/no-children-prop": "off", // LE TEMPS DE FAIRE LES CORRECTIONS
    },
  },
];
