import { getAllNationsFetch } from "../../services/nationService";
import { NATION_SORTING } from "../../settings/sorting";
import { loadingAtom, myStore, nationListAtomV2 } from "../../settings/store";
import { Nation } from "../../types/typNation";
import { errorCatching } from "../../utils/displayInfos";
import { findElementsByName, findNationsByTag } from "../../utils/functions";
import {
  sortByCreatedAt,
  sortByName,
  sortByPlaces,
  sortByPoints,
  sortByTreasury,
  sortNationsByCitizens,
} from "../../utils/sorting";
import { NationModel } from "../nationModel";
import { ListModel } from "./listModel";

export class NationListModel extends ListModel {
  constructor(
    list: NationModel[] = [],
    sorting: number = NATION_SORTING.descPoints.id,
  ) {
    super();
    this.items = list;
    this.sorting = sorting;
  }
  addToNationListAtom = (list: Nation[]) => {
    const updatedList = myStore.get(nationListAtomV2).addMany(list);
    myStore.set(nationListAtomV2, new NationListModel(updatedList));
  };
  getNationByOfficialId = (officialId: string) => {
    return this.items.find((nation) => nation.officialId === officialId);
  };
  loadNationList = async (
    searchName: string,
    searchTag: string,
    forceFetch: boolean = true,
  ) => {
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
          savedNations.length > 0
            ? savedNations
            : myStore.get(nationListAtomV2).getItems(),
        );
      }
      if (searchName === "" && searchTag === "") {
        savedNations = myStore.get(nationListAtomV2).getItems();
      }
      if (savedNations.length > 0 && !forceFetch) {
        this.items = savedNations;
      } else {
        const nations: Nation[] = await getAllNationsFetch(
          searchName,
          searchTag,
        );
        this.addMany(nations);
        this.addToNationListAtom(nations);
      }
      this.sortNations(this.sorting);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new NationListModel(this.items);
    }
  };
  private add(item: Nation) {
    if (!this.items.some((i) => i.officialId === item.officialId)) {
      this.items.push(new NationModel(item));
    }
  }
  addMany(items: Nation[]) {
    items.forEach((item) => this.addOrUpdate(item));
    return this.items;
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
      case NATION_SORTING.ascTreasury.id:
        sortByTreasury(this.items, true);
        break;
      case NATION_SORTING.descTreasury.id:
        sortByTreasury(this.items, false);
        break;
      case NATION_SORTING.ascDate.id:
        sortByCreatedAt(this.items, true);
        break;
      case NATION_SORTING.descDate.id:
        sortByCreatedAt(this.items, false);
        break;
      case NATION_SORTING.ascPoints.id:
        sortByPoints(this.items, true);
        break;
      case NATION_SORTING.descPoints.id:
        sortByPoints(this.items, false);
        break;
      default:
        break;
    }
    this.sorting = selectOption;
    return new NationListModel(this.items, this.sorting);
  };

  getOnlyOfficialNations = () => {
    return new NationListModel(
      this.items.filter(
        (nation) => nation.data.roleplay.officialOwner === nation.owner,
      ),
    );
  };
}
