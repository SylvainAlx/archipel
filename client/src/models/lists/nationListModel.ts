import { getAllNationsFetch } from "../../services/nationServices";
import { NATION_SORTING } from "../../settings/sorting";
import {
  loadingAtom,
  myStore,
  nationListAtomV2,
  statsAtom,
} from "../../settings/store";
import { Nation } from "../../types/typNation";
import { errorCatching } from "../../utils/displayInfos";
import { findElementsByName, findNationsByTag } from "../../utils/functions";
import {
  sortByCreatedAt,
  sortByName,
  sortByPlaces,
  sortNationsByCitizens,
} from "../../utils/sorting";
import { NationModel } from "../nationModel";
import { ListModel } from "./listModel";

export class NationListModel extends ListModel {
  constructor(
    list: NationModel[] = [],
    sorting: number = NATION_SORTING.descCtz.id,
  ) {
    super();
    this.items = list;
    this.sorting = sorting;
  }

  loadNationList = async (searchName: string, searchTag: string) => {
    myStore.set(loadingAtom, true);
    try {
      this.items = [];
      let savedNations: NationModel[] = [];
      if (searchName != "") {
        savedNations = findElementsByName(
          searchName,
          myStore.get(nationListAtomV2).getItems(),
        );
      }
      if (searchTag != "") {
        savedNations = findNationsByTag(
          searchTag,
          myStore.get(nationListAtomV2).getItems(),
        );
      }
      if (searchName === "" && searchTag === "") {
        savedNations = myStore.get(nationListAtomV2).getItems();
      }
      if (
        savedNations.length > 0 &&
        savedNations.length === myStore.get(statsAtom).counts.nations
      ) {
        this.addMany(savedNations);
      } else {
        const nations: Nation[] = await getAllNationsFetch(
          searchName,
          searchTag,
        );
        this.addMany(nations);
        const updatedList = myStore.get(nationListAtomV2).addMany(nations);
        updatedList != undefined && myStore.set(nationListAtomV2, updatedList);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationListModel(this.items);
    }
  };
  private add(item: Nation) {
    this.items.push(new NationModel(item));
  }
  addMany(items: Nation[]) {
    items.forEach((item) => this.addOrUpdate(item));
  }
  addOrUpdate(item: Nation) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new NationModel(item);
    } else {
      this.add(item);
    }
    return this.items;
  }
  sortNations = (selectOption: number) => {
    switch (selectOption) {
      case NATION_SORTING.ascAlpha.id:
        sortByName(this.items, true);
        break;
      case NATION_SORTING.descAlpha.id:
        sortByName(this.items, false);
        break;
      case NATION_SORTING.ascLoc.id:
        sortByPlaces(this.items, true);
        break;
      case NATION_SORTING.descLoc.id:
        sortByPlaces(this.items, false);
        break;
      case NATION_SORTING.ascCtz.id:
        sortNationsByCitizens(this.items, true);
        break;
      case NATION_SORTING.descCtz.id:
        sortNationsByCitizens(this.items, false);
        break;
      // case NATION_SORTING.ascTreasury.id:
      //   setList(sortByTreasury(list, true));
      //   break;
      // case NATION_SORTING.descTreasury.id:
      //   setList(sortByTreasury(list, false));
      //   break;
      case NATION_SORTING.ascDate.id:
        sortByCreatedAt(this.items, true);
        break;
      case NATION_SORTING.descDate.id:
        sortByCreatedAt(this.items, false);
        break;
      default:
        break;
    }
    this.sorting = selectOption;
    return new NationListModel(this.items, this.sorting);
  };
}
