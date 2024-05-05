import { BuildCategory } from "./typPlace";

/* eslint-disable @typescript-eslint/no-explicit-any */



export interface ComPayload {
  originId: string;
  originName: string;
  title?: string;
  comType: number;
  message?: string;
}

export interface PlacePayload {
  nation: string;
  name: string;
  description: string;
  image: string;
  builds: BuildCategory[]
}
