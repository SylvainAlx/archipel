/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadingAtom, myStore, tileListAtom } from "../../settings/store";
import { Tile } from "../../types/typTile";
import { getTempArray } from "../../utils/functions";
import { errorMessage } from "../../utils/toasts";
import {
  createTileFetch,
  deleteTileFetch,
  getNationTileFetch,
} from "./tileFetch";

export const createTile = async (tile: Tile) => {
  myStore.set(loadingAtom, true);
  createTileFetch(tile)
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data.tile) {
        const tempArray = [...myStore.get(tileListAtom)];
        tempArray.push(data.tile);
        myStore.set(tileListAtom, tempArray);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.log(error);
    });
};

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

export const deleteTile = async (id: string) => {
  myStore.set(loadingAtom, true);
  deleteTileFetch(id)
    .then((resp) => {
      const tempArray = getTempArray(
        resp.tile.nationOfficialId,
        myStore.get(tileListAtom),
      );
      console.log(tempArray);
      myStore.set(tileListAtom, tempArray);
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};
