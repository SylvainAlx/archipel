export interface Place {
  _id?: string;
  nationId: string;
  buildDate: Date;
  type: number;
  cost: number;
  level: number;
  points: number;
  slots: number;
  builds: number;
  population: number;
  name: string;
  description: string;
  image: string;
}

export const emptyPlace: Place = {
  nationId: "",
  buildDate: new Date(0),
  type: 0,
  cost: 0,
  level: 0,
  points: 0,
  slots: 0,
  builds: 0,
  population: 0,
  name: "",
  description: "",
  image: "",
};
