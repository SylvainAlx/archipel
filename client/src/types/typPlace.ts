export interface Place {
  _id?: string;
  officialId: string;
  nation: string;
  parentId: string;
  type: number;
  population: number;
  name: string;
  description: string;
  image: string;
}

export const emptyPlace: Place = {
  nation: "",
  officialId: "",
  parentId: "",
  type: 0,
  population: 0,
  name: "",
  description: "",
  image: "",
};
