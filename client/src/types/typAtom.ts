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