/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hashtag, LabelId, Regime } from "./typNation";
import { Place } from "./typPlace";

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
  actionToDo?: () => void;
}

export const ConfirmBoxDefault: ConfirmBox = {
  action: "",
  text: "",
  result: "",
};

// editBox

export interface EditBox {
  target: string;
  original: string | number | boolean | Regime[] | LabelId[] | any[];
  new: string | number | boolean | Regime[] | LabelId[] | any[];
  path: string;
  indice?: number | string;
  canBeEmpty?: boolean;
  action?: (path: string, value: any) => void;
}

export const EditBoxDefault: EditBox = {
  target: "",
  original: -1,
  new: -1,
  path: "",
  canBeEmpty: true,
};

export interface InfoModal {
  text: string;
  subtitle?: string;
  image?: string;
  copy?: boolean;
}

export const emptyInfo: InfoModal = {
  text: "",
  subtitle: "",
  image: "",
  copy: false,
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

export interface Counts {
  nations: number;
  citizens: number;
  places: number;
  tags: number;
  coms: number;
}
export type Stats = {
  counts: Counts;
  tags: Hashtag[];
};
