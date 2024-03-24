/* eslint-disable @typescript-eslint/no-explicit-any */
import { LabelId, PoliticalSide, Regime } from "./typNation";
import { Place } from "./typPlace";

// editPlace

export interface EditPlaceParam {
  place: Place;
  update?: number;
}

// confirmBox

export interface ConfirmBox {
  action: string;
  text: string;
  result: string;
  target?: any;
  payload?: any;
}

export const ConfirmBoxDefault: ConfirmBox = {
  action: "",
  text: "",
  result: "",
};

// editBox

export interface EditBox {
  original:
    | string
    | number
    | boolean
    | Regime[]
    | PoliticalSide[]
    | LabelId[];
  new: string | number | boolean | Regime[] | PoliticalSide[] | LabelId[];
  path: string;
  indice?: number;
}

export const EditBoxDefault: EditBox = {
  original: -1,
  new: -1,
  path: "",
};

// Param

export interface Param {
  name: string;
  props: Array<{ label: string; value: string | number }>;
}

//  Com

export interface Com {
  _id: string;
  originId: string;
  destinationId?: string;
  originName: string;
  title: string;
  comType: number;
  message: string;
  createdAt: Date;
}

export const EmptyCom: Com = {
  _id: "",
  originId: "",
  destinationId: "",
  originName: "",
  title: "",
  comType: -1,
  message: "",
  createdAt: new Date(),
};

//  Others

export interface StandardOption {
  id: number;
  label: string;
}
