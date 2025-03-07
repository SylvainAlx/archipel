export const DEFAULT_QUOTAS = {
  PLACES: 10,
  TILES: 8,
  COMS: 1, // par jour
};

export const DEFAULT_COSTS = {
  PLACES: 20,
  TILES: 10,
  COMS: 10,
};

export const DEFAULT_GIFTS = {
  REGISTER: 10,
  NEW_NATION: 100,
  CITIZENSHIP: 10,
};

export const COMTYPE = [
  { id: 0, label: "administrateur" },
  { id: 1, label: "Annonce générale" },
  { id: 10, label: "nation com privée" },
  { id: 11, label: "nation com publique" },
  { id: 12, label: "nation modification" },
  { id: 20, label: "info utilisateur" },
  { id: 21, label: "coms privées utilisateur" },
];

export const PLACE_TYPE = {
  state: 0,
  county: 1,
  city: 2,
  nature: 3,
};
