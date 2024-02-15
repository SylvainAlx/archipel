// Auth

import { StandardOption } from "../types/typAtom";
import { PoliticalSide, RegimeOption } from "../types/typNation";

export const MDP_LOBBY = import.meta.env.VITE_MDP_LOBBY;

//  server

const server = {
  prod: import.meta.env.VITE_SERVER_URL_PROD,
  dev: import.meta.env.VITE_SERVER_URL_DEV,
};

export const SERVER_URL = server.prod;

export const SERVEUR_LOADING_STRING =
  "Connexion au serveur, merci de patienter quelques instants";

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

export const nationSortOptions: StandardOption[] = [
  { id: 0, label: "Alphabetique croissant" },
  { id: 1, label: "Alphabetique décroissant" },
  { id: 2, label: "Point croissant" },
  { id: 3, label: "Point décroissant" },
];

export const comOptions: StandardOption[] = [
  { id: 0, label: "contact administrateur" },
  { id: 1, label: "Nouvelle nation" },
  { id: 2, label: "Suppression d'une nation" },
  { id: 3, label: "Politique intérieure (public)" },
  { id: 4, label: "Politique extérieure (public)" },
  { id: 5, label: "Modification apportée" },
];

export const comTypeOptions = [comOptions[3], comOptions[4], comOptions[0]];

export const regimeOptions: RegimeOption[] = [
  { id: 0, label: "régime politique inconnu", color: "bg-regime_0" },
  { id: 1, label: "pas de gouvernement", color: "bg-regime_0" },
  { id: 2, label: "république à régime présidentiel", color: "bg-regime_1" },
  {
    id: 3,
    label: "république à régime semi-présidentiel",
    color: "bg-regime_1",
  },
  { id: 4, label: "république parlementaire", color: "bg-regime_1" },
  { id: 5, label: "république à parti unique", color: "bg-regime_1" },
  { id: 6, label: "monarchie constitutionnelle", color: "bg-regime_100" },
  { id: 7, label: "monarchie absolue", color: "bg-regime_100" },
  { id: 8, label: "dictature militaire", color: "bg-regime_200" },
  { id: 9, label: "gouvernement provisoire", color: "bg-regime_200" },
  { id: 10, label: "autre", color: "bg-regime_200" },
];

export const politicalSideList: PoliticalSide[] = [
  { id: -90, label: "Extrême gauche" },
  { id: -60, label: "Gauche radicale" },
  { id: -20, label: "Gauche modérée" },
  { id: 0, label: "Centriste" },
  { id: 20, label: "Droite modérée" },
  { id: 60, label: "Droite radicale" },
  { id: 90, label: "Extrême droite" },
];

export const placesTypeList = [
  {
    id: 0,
    label: "Hameau",
    cost: 100,
    points: 1,
    population: 10,
    waitTime: 315,
    image: "",
    description: "Quelques maisons au milieu de nulle part",
  },
  {
    id: 1,
    label: "Bourgade",
    cost: 1000,
    points: 10,
    population: 100,
    waitTime: 630,
    image: "",
    description: "L'ébauche d'un petit village",
  },
  {
    id: 2,
    label: "Village",
    cost: 10000,
    points: 100,
    population: 1000,
    waitTime: 1260,
    image: "",
    description: "Tout ce qu'il faut pour faire une communauté",
  },
  {
    id: 3,
    label: "Ville",
    cost: 100000,
    points: 1000,
    population: 10000,
    waitTime: 2520,
    image: "",
    description: "Communauté de grande taille",
  },
  {
    id: 4,
    label: "Métropole",
    cost: 1000000,
    points: 10000,
    population: 100000,
    waitTime: 5040,
    image: "",
    description: "Grande agglomération",
  },
  {
    id: 5,
    label: "Mégalopole",
    cost: 10000000,
    points: 100000,
    population: 102400,
    waitTime: 10080,
    image: "",
    description: "Grande métropole à rayonnement internationnal",
  },
];

// onglets

export const nationTabs: StandardOption[] = [
  { id: 0, label: "ACTUALITES" },
  { id: 1, label: "LISTE DES NATIONS" },
  { id: 2, label: "STATISTIQUES" },
];
