import { buildList } from "../settings/consts";

export interface Place {
  _id?: string;
  nation: string;
  type: number;
  cost: number;
  level: number;
  points: number;
  slots: number;
  population: number;
  name: string;
  description: string;
  image: string;
  builds: BuildCategory[];
}

export const emptyPlace: Place = {
  nation: "",
  type: 0,
  cost: 0,
  level: 0,
  points: 0,
  slots: 0,
  population: 0,
  name: "",
  description: "",
  image: "",
  builds: buildList
};

export interface BuildCategory {
  id: number;
  label: {fr: string; en: string};
  builds: Build[]
}

interface Build {
  id: number;
  label: {fr: string; en: string};
  level: number;
  count: number;
  max: number;
}