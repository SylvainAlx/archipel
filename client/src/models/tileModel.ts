import {
  createTileFetch,
  deleteTileFetch,
  updateTileFetch,
} from "../services/tileService";
import {
  loadingAtom,
  myStore,
  nationListAtomV2,
  tileListAtomV2,
} from "../settings/store";
import { Nation } from "../types/typNation";
import { emptyTile, Tile } from "../types/typTile";
import { displayTileInfoByType, errorCatching } from "../utils/displayInfos";
import { TileListModel } from "./lists/tileListModel";

export class TileModel implements Tile {
  _id!: string;
  nationOfficialId!: string;
  title!: string;
  description?: string;
  value!: string | number;
  updatedAt!: string;
  isFree!: boolean;

  constructor(data: Partial<Tile> = {}) {
    const defaultData = { ...emptyTile, ...data };
    this.updateFields(defaultData);
    this.baseInsert = this.baseInsert.bind(this);
    this.baseUpdate = this.baseUpdate.bind(this);
    this.baseDelete = this.baseDelete.bind(this);
  }
  updateFields(fields: Partial<TileModel>) {
    Object.assign(this, fields);
    return this;
  }
  baseInsert = async (tile?: TileModel) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { tile: Tile; nation: Nation; infoType: string } =
        await createTileFetch(tile ? tile : this);
      this.updateFields(resp.tile);
      myStore.get(tileListAtomV2).addToTileListAtom([resp.tile]);
      myStore.get(nationListAtomV2).addToNationListAtom([resp.nation]);
      displayTileInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new TileModel(this);
    }
  };
  baseUpdate = async (tile?: TileModel) => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { tile: Tile; infoType: string } = await updateTileFetch(
        tile ? tile : this,
      );
      this.updateFields(resp.tile);
      myStore.get(tileListAtomV2).addToTileListAtom([resp.tile]);
      displayTileInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new TileModel(this);
    }
  };
  baseDelete = async () => {
    myStore.set(loadingAtom, true);
    try {
      const resp: { tile: Tile; nation: Nation; infoType: string } =
        await deleteTileFetch(this._id);
      const updatedList = myStore
        .get(tileListAtomV2)
        .removeByBaseId(resp.tile._id);
      myStore.set(tileListAtomV2, new TileListModel(updatedList));
      myStore.get(nationListAtomV2).addToNationListAtom([resp.nation]);
      displayTileInfoByType(resp.infoType);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
}
