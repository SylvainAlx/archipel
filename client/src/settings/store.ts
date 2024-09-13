import { atom, createStore } from "jotai";

import {
  EmptyNation,
  emptyNewNationPayload,
  Nation,
  NationRoleplayData,
  NewNationPayload,
} from "../types/typNation";
import {
  ConfirmBoxDefault,
  EditBoxDefault,
  EditPlaceParam,
  Param,
  Session,
} from "../types/typAtom";
import { Place, emptyPlace } from "../types/typPlace";
import i18n from "../i18n/i18n";
import { emptyUser, User } from "../types/typUser";
import { Tag } from "../types/typTag";
import { Com } from "../types/typCom";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
} from "../types/typRelation";

export const myStore = createStore();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

// Loading

export const loadingAtom = atom(false);

// Session

export const emptySession = { user: emptyUser, nation: EmptyNation, jwt: "" };
export const sessionAtom = atom<Session>(emptySession);
export const session = myStore.get(sessionAtom);

// Stats

interface Counts {
  nations: number;
  citizens: number;
  places: number;
  tags: number;
  coms: number;
}

type Stats = {
  counts: Counts;
};

export const statsAtom = atom<Stats>({
  counts: { nations: 0, citizens: 0, places: 0, tags: 0, coms: 0 },
});

// Citizen

export const citizenFetchAtom = atom<User>(emptyUser);
export const citizenListAtom = atom<User[]>([]);
export const nationCitizenListAtom = atom<User[]>([]);

// Nation

export const nationFetchedAtom = atom<Nation>(EmptyNation);
export const nationsRoleplayDataAtom = atom<NationRoleplayData[]>([]);
export const newNationAtom = atom<NewNationPayload>(emptyNewNationPayload);
export const nationsListAtom = atom<Nation[]>([]);

// Place

export const placeFetchedAtom = atom<Place>(emptyPlace);
export const placesListAtom = atom<Place[]>([]);
export const nationPlacesListAtom = atom<Place[]>([]);
export const newPlaceAtom = atom<Place>(emptyPlace);
export const editPlaceAtom = atom<EditPlaceParam>({ place: emptyPlace });

// Relation

export const relationFetchedAtom = atom<DiplomaticRelationship>(
  emptyDiplomaticRelationship,
);
export const relationListAtom = atom<DiplomaticRelationship[]>([]);

// com

export const comFetchedListAtom = atom<Com[]>([]);
export const comsListAtom = atom<Com[]>([]);

// tag

export const tagListAtom = atom<Tag[]>([]);

// Param

export const paramsListAtom = atom<Param[]>([]);

export const showLangModalAtom = atom(false);
export const recoveryKey = atom("");
export const confirmBox = atom(ConfirmBoxDefault);
export const editbox = atom(EditBoxDefault);
export const infoModalAtom = atom("");

export const changePasswordModalAtom = atom(false);
export const showApp = atom(false);

export const dataCheckedAtom = atom(false);

export const langAtom = atom(i18n.language);

export const imageAtom = atom("");

export const showMenuAtom = atom(false);
