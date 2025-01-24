import { atom, createStore } from "jotai";

import {
  EmptyNation,
  emptyNewNationPayload,
  Nation,
  NewNationPayload,
} from "../types/typNation";
import {
  ConfirmBoxDefault,
  EditBoxDefault,
  InfoModal,
  Param,
  Stats,
} from "../types/typAtom";
import { Place, emptyPlace } from "../types/typPlace";
import { emptyUser, User } from "../types/typUser";
import { ComPayload, emptyComPayload } from "../types/typCom";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
} from "../types/typRelation";
import { emptyTile, Tile } from "../types/typTile";
import { ComListModel } from "../models/lists/comListModel";
import { PlaceListModel } from "../models/lists/placeListModel";
import { NationListModel } from "../models/lists/nationListModel";
import { NationModel } from "../models/nationModel";

export const myStore = createStore();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

// Cookies
export const showCookiesModalAtom = atom(true);

// Loading
export const loadingAtom = atom(false);
export const longLoadingAtom = atom(false);

// Lobby
export const lobbyAtom = atom(false);

// Session

export const emptySession = {
  user: emptyUser,
  nation: new NationModel(),
  jwt: "",
};

export interface Session {
  user: User;
  nation: NationModel;
  jwt: string;
}

// Stats

export const statsAtom = atom<Stats>({
  counts: { nations: 0, citizens: 0, places: 0, tags: 0, coms: 0 },
});

// Citizen
export const citizenFetchAtom = atom<User>(emptyUser);
export const citizenListAtom = atom<User[]>([]);
export const nationCitizenListAtom = atom<User[]>([]);
export const bannedCitizensAtom = atom<User[]>([]);

// Nation
export const nationFetchedAtom = atom<Nation>(EmptyNation);

// Relation
export const relationListAtom = atom<DiplomaticRelationship[]>([]);
export const newRelationAtom = atom({
  update: false,
  show: false,
  relation: emptyDiplomaticRelationship,
});

// tile
export const nationTileListAtom = atom<Tile[]>([]);
export const tileListAtom = atom<Tile[]>([]);

// Param
export const paramsListAtom = atom<Param[]>([]);

export const showLangModalAtom = atom(false);
export const recoveryKey = atom("");
export const confirmBox = atom(ConfirmBoxDefault);
export const editbox = atom(EditBoxDefault);
export const infoModalAtom = atom<InfoModal>({ text: "", image: "" });

export const changePasswordModalAtom = atom(false);

export const imageAtom = atom("");

export const showMenuAtom = atom(false);

export const editTileAtom = atom(emptyTile);

//---- V2 ----
export const sessionAtom = atom<Session>(emptySession);

export const comListAtomV2 = atom<ComListModel>(new ComListModel());
export const placeListAtomV2 = atom<PlaceListModel>(new PlaceListModel());
export const nationListAtomV2 = atom<NationListModel>(new NationListModel());

export const nationComListAtomV2 = atom<ComListModel>(new ComListModel());
export const nationPlaceListAtomV2 = atom<PlaceListModel>(new PlaceListModel());

export const newComAtom = atom<ComPayload>(emptyComPayload);
export const newPlaceAtom = atom<Place>(emptyPlace);
export const newNationAtom = atom<NewNationPayload>(emptyNewNationPayload);
//---- V2 ----
