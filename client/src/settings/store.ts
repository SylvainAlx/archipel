import { atom, createStore } from "jotai";

import { emptyNewNationPayload, NewNationPayload } from "../types/typNation";
import {
  ConfirmBoxDefault,
  EditBoxDefault,
  emptyCreditTransfert,
  emptyInfo,
  InfoModal,
  Stats,
} from "../types/typAtom";
import { Place, emptyPlace } from "../types/typPlace";
import { ComPayload, emptyComPayload } from "../types/typCom";
import { ComListModel } from "../models/lists/comListModel";
import { PlaceListModel } from "../models/lists/placeListModel";
import { NationListModel } from "../models/lists/nationListModel";
import { UserListModel } from "../models/lists/userListModel";
import { UserModel } from "../models/userModel";
import { TileListModel } from "../models/lists/tileListModel";
import { TileModel } from "../models/tileModel";
import { RelationListModel } from "../models/lists/relationListModel";
import { RelationModel } from "../models/relationModel";
import { emptyDiplomaticRelationship } from "../types/typRelation";
import { Param } from "../types/typeParam";

export const myStore = createStore();

// Session
export const emptySession = {
  user: new UserModel(),
  jwt: "",
};

export interface Session {
  user: UserModel;
  jwt: string;
}
export const sessionAtom = atom<Session>(emptySession);

//---- Lists ----
export const comListAtomV2 = atom<ComListModel>(new ComListModel());
export const placeListAtomV2 = atom<PlaceListModel>(new PlaceListModel());
export const nationListAtomV2 = atom<NationListModel>(new NationListModel());
export const userListAtomV2 = atom<UserListModel>(new UserListModel());
export const tileListAtomV2 = atom<TileListModel>(new TileListModel());
export const relationListAtomV2 = atom<RelationListModel>(
  new RelationListModel(),
);
export const bannedCitizensAtom = atom<UserListModel>(new UserListModel());

//---- Modals ----
export const newComAtom = atom<ComPayload>(emptyComPayload);
export const newPlaceAtom = atom<Place>(emptyPlace);
export const newNationAtom = atom<NewNationPayload>(emptyNewNationPayload);
export const editTileAtom = atom<TileModel>(new TileModel());
export const newRelationAtom = atom({
  update: false,
  show: false,
  relation: new RelationModel(emptyDiplomaticRelationship),
});
export const creditTransferAtom = atom(emptyCreditTransfert);
export const showCookiesModalAtom = atom(true);
export const showLangModalAtom = atom(false);
export const recoveryKey = atom("");
export const confirmBox = atom(ConfirmBoxDefault);
export const editbox = atom(EditBoxDefault);
export const infoModalAtom = atom<InfoModal>(emptyInfo);
export const changePasswordModalAtom = atom(false);
export const imageAtom = atom("");
export const showMenuAtom = atom(false);
export const showHelpAtom = atom(false);

// Loading
export const loadingAtom = atom(false);
export const longLoadingAtom = atom(false);

// Lobby
export const lobbyAtom = atom(false);

// Stats
export const statsAtom = atom<Stats>({
  counts: { nations: 0, citizens: 0, places: 0, tags: 0, coms: 0 },
  tags: [],
});

export const paramsAtom = atom<Param[]>([]);
