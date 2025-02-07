import { getNationTileFetch } from "../../services/tileService";
import { loadingAtom, myStore, tileListAtomV2 } from "../../settings/store";
import { Tile } from "../../types/typTile";
import { errorCatching } from "../../utils/displayInfos";
import { TileModel } from "../tileModel";
import { ListModel } from "./listModel";

export class TileListModel extends ListModel {
  constructor(list: TileModel[] = []) {
    super();
    this.items = list;
  }
  loadTiles = async (nationOfficialId: string) => {
    const savedNationTileList: Tile[] = [];
    myStore
      .get(tileListAtomV2)
      .getItems()
      .forEach((tile) => {
        if (tile.nationOfficialId === nationOfficialId) {
          savedNationTileList.push(tile);
        }
      });
    if (savedNationTileList.length > 0) {
      this.addMany(savedNationTileList);
    } else {
      myStore.set(loadingAtom, true);
      try {
        const tiles: Tile[] = await getNationTileFetch(nationOfficialId);
        this.addMany(tiles);
        this.addToTileListAtom(tiles);
      } catch (error) {
        errorCatching(error);
      } finally {
        myStore.set(loadingAtom, false);
      }
      return new TileListModel(this.items);
    }
  };
  addToTileListAtom = (tiles: Tile[]) => {
    const updatedList = myStore.get(tileListAtomV2).addMany(tiles);
    myStore.set(tileListAtomV2, new TileListModel(updatedList));
  };
  private add(item: Tile) {
    if (!this.items.some((i) => i._id === item._id)) {
      this.items.push(new TileModel(item));
    }
  }
  addMany(items: Tile[]) {
    items.forEach((item) => this.addOrUpdate(item));
    return this.items;
  }
  addOrUpdate(item: Tile) {
    const index = this.items.findIndex((i) => i._id === item._id);
    if (index > -1) {
      this.items[index] = new TileModel(item);
    } else {
      this.add(item);
    }
    return this.items;
  }
}
