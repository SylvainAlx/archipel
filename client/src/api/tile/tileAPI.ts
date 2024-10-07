/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadingAtom, myStore, tileListAtom } from "../../settings/store";
import { Tile } from "../../types/typTile";
import { deleteElementOfAtomArray } from "../../utils/functions";
import { errorMessage } from "../../utils/toasts";
import { deleteTileFetch, getNationTileFetch } from "./tileFetch";

const tileList = myStore.get(tileListAtom);
const setTileList = (list: Tile[]) => myStore.set(tileListAtom, list);

export const getNationTile = async (nationOfficialId: string) => {
  myStore.set(loadingAtom, true);
  getNationTileFetch(nationOfficialId)
    .then((data: any) => {
      myStore.set(loadingAtom, false);
      myStore.set(tileListAtom, data);
    })
    .catch((error) => {
      myStore.set(loadingAtom, true);
      console.log(error);
    });
};

export const deleteTile = async (title: string) => {
  myStore.set(loadingAtom, true);
  deleteTileFetch(title)
    .then((resp) => {
      deleteElementOfAtomArray(resp.tile.officialId, tileList, setTileList);
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};
