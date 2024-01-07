//  server

const server = {
  prod : "https://archipel-server.onrender.com",
  dev : "http://localhost:3000"
}

export const SERVER_URL = server.prod;

// Titles

export const TITLE = "NAVIR";
export const  SUBTITLE = "NATIONS VIRTUELLES";


//  Colors

export const color_primary = "var(--color-main)";
export const color_secondary = "var(--color-secondary)";
export const color_complementary = "var(--color-complementary)";
export const color_light = "var(--color-light)";
export const color_black_alpha = "var(--color-black-alpha)";

// listes

export const nationSortOptions = [
  {id: 0, label: "Alphabetique croissant"},
  {id: 1, label: "Alphabetique décroissant"},
  {id: 2, label: "Point croissant"},
  {id: 3, label: "Point décroissant"}
]

// onglets

export const nationTabs = [
  {id: 0, label: "LISTE DES NATIONS"},
  {id: 1, label: "STATISTIQUES"},
  {id: 2, label: "COMMUNICATIONS"},
]