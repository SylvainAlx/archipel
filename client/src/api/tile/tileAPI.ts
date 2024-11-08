/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loadingAtom,
  myStore,
  nationFetchedAtom,
  nationTileListAtom,
  sessionAtom,
  tileListAtom,
} from "../../settings/store";
import { Nation } from "../../types/typNation";
import { Tile } from "../../types/typTile";
import {
  spliceByDBId,
  updateByDBId,
  updateOrCreateNationInMemory,
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
    .then((resp: { tile: Tile; nation: Nation; infoType: string }) => {
      if (resp.tile && resp.nation) {
        const tempArray = [...myStore.get(nationTileListAtom)];
        tempArray.push(resp.tile);
        myStore.set(nationTileListAtom, tempArray);
        updateOrCreateTileInMemory(resp.tile);
      }
      const session = myStore.get(sessionAtom);
      myStore.set(sessionAtom, {
        nation: resp.nation,
        user: session.user,
        jwt: session.jwt,
      });
      updateOrCreateNationInMemory(resp.nation);
      myStore.set(nationFetchedAtom, resp.nation);
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
    .then((resp: { tile: Tile; nation: Nation; infoType: string }) => {
      if (resp.tile && resp.nation) {
        let tempArray = spliceByDBId(
          resp.tile._id,
          myStore.get(nationTileListAtom),
        );
        myStore.set(nationTileListAtom, tempArray);
        tempArray = spliceByDBId(resp.tile._id, myStore.get(tileListAtom));
        myStore.set(tileListAtom, tempArray);
        const session = myStore.get(sessionAtom);
        myStore.set(sessionAtom, {
          nation: resp.nation,
          user: session.user,
          jwt: session.jwt,
        });
        updateOrCreateNationInMemory(resp.nation);
        myStore.set(nationFetchedAtom, resp.nation);
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
        updateOrCreateTileInMemory(resp.tile);
        const tempNationTileArray = updateByDBId(
          resp.tile,
          myStore.get(nationTileListAtom),
        );
        myStore.set(nationTileListAtom, tempNationTileArray);
      }
      displayTileInfoByType(resp.infoType);
      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};
