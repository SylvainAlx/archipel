import { RegimeOption } from "./typNation";

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

export interface EditBox {
  original: string | number | boolean | RegimeOption[];
  new: string | number | boolean | RegimeOption[];
  path: string;
  indice?: number;
}

export const EditBoxDefault: EditBox = {
  original: -1,
  new: -1,
  path: "",
};
