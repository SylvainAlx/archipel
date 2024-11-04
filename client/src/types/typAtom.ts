/* eslint-disable @typescript-eslint/no-explicit-any */
import { LabelId, Nation, PoliticalSide, Regime } from "./typNation";
import { Place } from "./typPlace";
import { User } from "./typUser";

export interface Session {
  user: User;
  nation: Nation;
  jwt: string;
}

// editPlace

export interface EditPlaceParam {
  place: Place;
  update?: number;
  owner?: boolean;
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
  target: string;
  original:
    | string
    | number
    | boolean
    | Regime[]
    | PoliticalSide[]
    | LabelId[]
    | any[];
  new:
    | string
    | number
    | boolean
    | Regime[]
    | PoliticalSide[]
    | LabelId[]
    | any[];
  path: string;
  indice?: number | string;
  canBeEmpty?: boolean;
}

export const EditBoxDefault: EditBox = {
  target: "",
  original: -1,
  new: -1,
  path: "",
  canBeEmpty: true,
};

// Param

export interface Param {
  name: string;
  props: Array<{ label: string; value: string | number }>;
}

//  Others

export interface StandardOption {
  id: number | string;
  label: string;
}
