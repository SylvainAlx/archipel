/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hashtag, LabelId, Regime } from "./typNation";

// confirmBox

export interface ConfirmBox {
  text: string;
  actionToDo?: () => void;
}

export const ConfirmBoxDefault: ConfirmBox = {
  text: "",
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
  subtitle: string;
  // eslint-disable-next-line no-undef
  children?: JSX.Element;
}

export const emptyInfo: InfoModal = {
  subtitle: "",
};

//  Others

export interface StandardOption {
  id: number | string;
  label: string;
  descriptions?: string;
}

export interface Counts {
  tags: number;
}
export type Stats = {
  counts: Counts;
  tags: Hashtag[];
};

export const emptyCreditTransfert = {
  sender: {
    name: "",
    officialId: "",
  },
  recipient: {
    name: "",
    officialId: "",
  },
  amount: 0,
  comment: "",
};
