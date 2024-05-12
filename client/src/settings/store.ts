import { atom, createStore } from "jotai";

import { EmptyNation, emptyNewNationPayload, Nation, NationRoleplayData, NewNationPayload } from "../types/typNation";
import {
  Com,
  ConfirmBoxDefault,
  EditBoxDefault,
  EditPlaceParam,
  Param,
  Session,
} from "../types/typAtom";
import { Place, emptyPlace } from "../types/typPlace";
import i18n from "../i18n/i18n";
import { emptyUser, User } from "../types/typUser";

export const myStore = createStore();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

// Loading

export const loadingAtom = atom(false);

// User

export const userAtom = atom<User>(emptyUser)
export const isLoggedAtom = atom<string>("")

export const emptySession = {user: emptyUser, nation: EmptyNation, jwt: ""}
export const sessionAtom = atom<Session>(emptySession)
export const session = myStore.get(sessionAtom)

// Nation

export const ownerAtom = atom(false);
export const nationAtom = atom<Nation>(EmptyNation);
export const selectedNationAtom = atom<Nation>(EmptyNation);
export const nationsRoleplayDataAtom = atom<NationRoleplayData[]>([]);
export const getSelectedNation = atom((get) => get(selectedNationAtom));
export const newNationAtom = atom<NewNationPayload>(emptyNewNationPayload);
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
