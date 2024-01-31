import { atom } from "jotai";

import { EmptyNation, Nation } from "../types/typNation";
import { Com, EmptyCom } from "../types/typCom";
import { ConfirmBoxDefault, EditBoxDefault } from "../types/typAtom";

export const nationAtom = atom<Nation>(EmptyNation);

export const selectedNationAtom = atom<Nation>(EmptyNation);
export const getSelectedNation = atom((get) => get(selectedNationAtom));

export const tempNationAtom = atom<Nation>(EmptyNation);
export const nationsListAtom = atom<Nation[]>([EmptyNation]);

export const comsListAtom = atom<Com[]>([EmptyCom]);

const atomString: string = "";
export const recoveryKey = atom(atomString);
export const confirmBox = atom(ConfirmBoxDefault);
export const editbox = atom(EditBoxDefault);
export const infoModal = atom("");
const loadingAtom = {
  show: false,
  text: "",
};
export const loadingSpinner = atom(loadingAtom);
export const showApp = atom(false);
