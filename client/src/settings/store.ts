import { atom, createStore } from "jotai";

import { emptyNewNationPayload, NewNationPayload } from "../types/typNation";
import {
  ConfirmBoxDefault,
  EditBoxDefault,
  emptyInfo,
  InfoModal,
  Param,
  Stats,
} from "../types/typAtom";
import { Place, emptyPlace } from "../types/typPlace";
import { ComPayload, emptyComPayload } from "../types/typCom";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
} from "../types/typRelation";
import { emptyTile, Tile } from "../types/typTile";
import { ComListModel } from "../models/lists/comListModel";
import { PlaceListModel } from "../models/lists/placeListModel";
import { NationListModel } from "../models/lists/nationListModel";
import { UserListModel } from "../models/lists/userListModel";
import { UserModel } from "../models/userModel";

export const myStore = createStore();

// Cookies
export const showCookiesModalAtom = atom(true);

// Loading
export const loadingAtom = atom(false);
export const longLoadingAtom = atom(false);

// Lobby
export const lobbyAtom = atom(false);

// Session
export const emptySession = {
  user: new UserModel(),
  jwt: "",
};

export interface Session {
  user: UserModel;
  jwt: string;
}

// Stats
export const statsAtom = atom<Stats>({
  counts: { nations: 0, citizens: 0, places: 0, tags: 0, coms: 0 },
  tags: [],
});

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
export const infoModalAtom = atom<InfoModal>(emptyInfo);
export const changePasswordModalAtom = atom(false);
export const imageAtom = atom("");
export const showMenuAtom = atom(false);
export const editTileAtom = atom(emptyTile);

//---- V2 ----
export const sessionAtom = atom<Session>(emptySession);

export const comListAtomV2 = atom<ComListModel>(new ComListModel());
export const placeListAtomV2 = atom<PlaceListModel>(new PlaceListModel());
export const nationListAtomV2 = atom<NationListModel>(new NationListModel());
export const userListAtomV2 = atom<UserListModel>(new UserListModel());

export const bannedCitizensAtom = atom<UserListModel>(new UserListModel());

export const newComAtom = atom<ComPayload>(emptyComPayload);
export const newPlaceAtom = atom<Place>(emptyPlace);
export const newNationAtom = atom<NewNationPayload>(emptyNewNationPayload);
//---- V2 ----
