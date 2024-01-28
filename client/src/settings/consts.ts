// Auth

export const MDP_LOBBY = import.meta.env.VITE_MDP_LOBBY;

//  server

const server = {
  prod: import.meta.env.VITE_SERVER_URL_PROD,
  dev: import.meta.env.VITE_SERVER_URL_DEV,
};

export const SERVER_URL = server.dev;

export const COM_TYP = [
  { id: 0, label: "contact administrateur" },
  { id: 1, label: "Nouvelle nation" },
  { id: 2, label: "Suppression d'une nation" },
  { id: 3, label: "Politique intérieure (public)" },
  { id: 4, label: "Politique extérieure (public)" },
];

// Titles

export const TITLE = "NAVIR";
export const SUBTITLE = "NATIONS VIRTUELLES";

//  Colors

export const color_primary = "#081825";
export const color_secondary = "var(--color-secondary)";
export const color_complementary = "var(--color-complementary)";
export const color_light = "var(--color-light)";
export const color_black_alpha = "var(--color-black-alpha)";

// listes

export const nationSortOptions = [
  { id: 0, label: "Alphabetique croissant" },
  { id: 1, label: "Alphabetique décroissant" },
  { id: 2, label: "Point croissant" },
  { id: 3, label: "Point décroissant" },
];

export const comTypeOptions = [COM_TYP[3], COM_TYP[4], COM_TYP[0]];

export const regimeOptions = [
  { id: -1, label: "régime politique inconnu", color: "bg-danger" },
  { id: 0, label: "pas de gouvernement", color: "bg-danger" },
  { id: 1, label: "république à régime présidentiel", color: "bg-info" },
  { id: 2, label: "république à régime semi-présidentiel", color: "bg-info" },
  { id: 3, label: "république parlementaire", color: "bg-info" },
  { id: 4, label: "république à parti unique", color: "bg-info" },
  { id: 101, label: "monarchie constitutionnelle", color: "bg-info" },
  { id: 102, label: "monarchie absolue", color: "bg-info" },
  { id: 103, label: "dictature militaire", color: "bg-info" },
  { id: 201, label: "gouvernement provisoire", color: "bg-info" },
  { id: 202, label: "autre", color: "bg-info" },
];

// onglets

export const nationTabs = [
  { id: 0, label: "ACTUALITES" },
  { id: 1, label: "LISTE DES NATIONS" },
  { id: 2, label: "STATISTIQUES" },
];
