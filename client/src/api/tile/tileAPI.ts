/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loadingAtom,
  myStore,
  nationTileListAtom,
  tileListAtom,
} from "../../settings/store";
import { Tile } from "../../types/typTile";
import {
  spliceByDBId,
  updateByDBId,
  updateOrCreateTileInMemory,
} from "../../utils/atomArrayFunctions";
import { displayTileInfoByType } from "../../utils/displayInfos";
import { errorMessage } from "../../utils/toasts";
import {
  createTileFetch,
  deleteTileFetch,
  getNationTileFetch,
  updateTileFetch,
} from "./tileFetch";

export const createTile = (tile: Tile) => {
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

export const getNationTiles = (nationOfficialId: string) => {
  const savedNationTileList: Tile[] = [];
  myStore.get(tileListAtom).forEach((tile) => {
    if (tile.nationOfficialId === nationOfficialId) {
      savedNationTileList.push(tile);
    }
  });
  if (savedNationTileList.length > 0) {
    myStore.set(nationTileListAtom, savedNationTileList);
  } else {
    myStore.set(loadingAtom, true);
    getNationTileFetch(nationOfficialId)
      .then((resp: Tile[]) => {
        myStore.set(loadingAtom, false);
        myStore.set(nationTileListAtom, resp);
        if (resp.length > 0) {
          resp.forEach((tile) => {
            updateOrCreateTileInMemory(tile);
          });
        }
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        console.log(error);
      });
  }
};

export const deleteTile = (id: string) => {
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
