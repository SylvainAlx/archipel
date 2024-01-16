// Auth

export const MDP_LOBBY = "navir2024"

//  server

const server = {
  prod : import.meta.env.VITE_SERVER_URL_PROD,
  dev : import.meta.env.VITE_SERVER_URL_DEV
}

export const SERVER_URL = server.prod;

export const COM_TYP = [
  {id:0, label: "Test serveur"},
  {id:1, label: "Nouvelle nation"},
  {id:2, label: "Suppression d'une nation"},
  {id:3, label: "Annonce"},
]

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
  {id: 0, label: "ACTUALITES"},
  {id: 1, label: "LISTE DES NATIONS"},
  {id: 2, label: "STATISTIQUES"},
]
