import { PLACE_TYPE } from "../settings/consts";

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
  reported: boolean;
  banished: boolean;
  createdAt: Date;
  isFree: boolean;
}

export const emptyPlace: Place = {
  nation: "",
  officialId: "",
  parentId: "",
  type: PLACE_TYPE.state.id,
  population: 0,
  name: "",
  description: "",
  image: "",
  reported: false,
  banished: false,
  createdAt: new Date(0),
  isFree: true,
};

export interface PlacePayload {
  nation: string;
  name: string;
  description: string;
  image: string;
}
