import { atom, createStore } from "jotai";

import {
  EmptyNation,
  Nation,
  NationRoleplayData,
  Place,
  emptyPlace,
} from "../types/typNation";
import { Com, ConfirmBoxDefault, EditBoxDefault } from "../types/typAtom";

export const myStore = createStore();

// Loading

const loadingAtom = {
  show: false,
  text: "",
};
export const loadingSpinner = atom(loadingAtom);

// Nation

export const nationAtom = atom<Nation>(EmptyNation);
export const selectedNationAtom = atom<Nation>(EmptyNation);
export const NationsRoleplayDataAtom = atom<NationRoleplayData[]>([]);

export const getSelectedNation = atom((get) => get(selectedNationAtom));

export const tempNationAtom = atom<Nation>(EmptyNation);
export const nationsListAtom = atom<Nation[]>([EmptyNation]);

export const comsListAtom = atom<Com[]>([]);

export const newPlaceAtom = atom<Place>(emptyPlace);

export const recoveryKey = atom("");
export const confirmBox = atom(ConfirmBoxDefault);
export const editbox = atom(EditBoxDefault);

export const infoModal = atom("");

export const showApp = atom(false);

export const dataCheckedAtom = atom(false);
