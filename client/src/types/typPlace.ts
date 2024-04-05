import { buildList } from "../settings/consts";

export interface Place {
  _id?: string;
  officialId: string;
  nation: string;
  parentId: string;
  type: number;
  points: number;
  slots: number;
  population: number;
  name: string;
  description: string;
  image: string;
  builds: BuildCategory[];
  children: Place[];
}

export const emptyPlace: Place = {
  nation: "",
  officialId: "",
  parentId: "",
  type: 0,
  points: 1,
  slots: 10,
  population: 0,
  name: "",
  description: "",
  image: "",
  builds: buildList,
  children: [],
};

export interface BuildCategory {
  id: number;
  label: { fr: string; en: string };
  builds: Build[];
}

interface Build {
  id: number;
  label: { fr: string; en: string };
  level: number;
  count: number;
  max: number;
}
