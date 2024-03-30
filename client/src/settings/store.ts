import { atom, createStore } from "jotai";

import { EmptyNation, Nation, NationRoleplayData } from "../types/typNation";
import {
  Com,
  ConfirmBoxDefault,
  EditBoxDefault,
  EditPlaceParam,
  Param,
} from "../types/typAtom";
import { Place, emptyPlace } from "../types/typPlace";
import i18n from "../i18n/i18n";

export const myStore = createStore();

// Loading

export const loadingAtom = atom(false);

// Nation

export const ownerAtom = atom(false);
export const nationAtom = atom<Nation>(EmptyNation);
export const selectedNationAtom = atom<Nation>(EmptyNation);
export const nationsRoleplayDataAtom = atom<NationRoleplayData[]>([]);
export const getSelectedNation = atom((get) => get(selectedNationAtom));
export const tempNationAtom = atom<Nation>(EmptyNation);
export const nationsListAtom = atom<Nation[]>([]);

// place

export const placeAtom = atom<Place>(emptyPlace);
export const placesListAtom = atom<Place[]>([]);
export const nationPlacesListAtom = atom<Place[]>([]);
export const newPlaceAtom = atom<Place>(emptyPlace);
export const editPlaceAtom = atom<EditPlaceParam>({ place: emptyPlace });

// com

export const comsListAtom = atom<Com[]>([]);

// Param

export const paramsListAtom = atom<Param[]>([]);

export const showLangModalAtom = atom(false);
export const recoveryKey = atom("");
export const confirmBox = atom(ConfirmBoxDefault);
export const editbox = atom(EditBoxDefault);
export const infoModalAtom = atom("");
export const showApp = atom(false);

export const dataCheckedAtom = atom(false);

export const langAtom = atom(i18n.language);

export const imageAtom = atom("");

export const showMenuAtom = atom(false);
