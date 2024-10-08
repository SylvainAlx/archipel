/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadingAtom, myStore, tileListAtom } from "../../settings/store";
import { Tile } from "../../types/typTile";
import { spliceByDBId, updateByDBId } from "../../utils/atomArrayFunctions";
import { displayTileInfoByType } from "../../utils/displayInfos";
import { errorMessage } from "../../utils/toasts";
import {
  createTileFetch,
  deleteTileFetch,
  getNationTileFetch,
  updateTileFetch,
} from "./tileFetch";

export const createTile = async (tile: Tile) => {
  myStore.set(loadingAtom, true);
  createTileFetch(tile)
    .then((resp) => {
      if (resp.tile) {
        const tempArray = [...myStore.get(tileListAtom)];
        tempArray.push(resp.tile);
        myStore.set(tileListAtom, tempArray);
      }
      displayTileInfoByType(resp.infoType);
      myStore.set(loadingAtom, false);
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
      if (resp.tile) {
        const tempArray = spliceByDBId(
          resp.tile._id,
          myStore.get(tileListAtom),
        );
        myStore.set(tileListAtom, tempArray);
      }
      displayTileInfoByType(resp.infoType);
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const updateTile = (payload: Tile) => {
  myStore.set(loadingAtom, true);
  updateTileFetch(payload)
    .then((resp) => {
      if (resp.tile) {
        const tempArray = updateByDBId(resp.tile, myStore.get(tileListAtom));
        myStore.set(tileListAtom, tempArray);
      }
      displayTileInfoByType(resp.infoType);
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};
