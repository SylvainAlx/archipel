import { getAllStructuresFetch } from "../../services/structureService";
import { STRUCTURE_SORTIING } from "../../settings/sorting";
import {
  loadingAtom,
  myStore,
  structureListAtomV2,
} from "../../settings/store";
import { Structure } from "../../types/typStructure";
import { errorCatching } from "../../utils/displayInfos";
import { findElementsByName } from "../../utils/functions";
import { sortByCreatedAt, sortByName } from "../../utils/sorting";
import { StructureModel } from "../structureModel";
import { ListModel } from "./listModel";

export class StructureListModel extends ListModel {
  constructor(list: StructureModel[] | Structure[] = [], sorting: number = 0) {
    super();
    this.items = list;
    this.sorting = sorting;
  }
  loadStructureList = async (
    searchName: string,
    forceFetch: boolean = true,
  ) => {
    myStore.set(loadingAtom, true);
    try {
      this.items = [];
      let savedStructures: StructureModel[] = myStore
        .get(structureListAtomV2)
        .getItems();
      if (searchName != "") {
        savedStructures = findElementsByName(
          searchName,
          myStore.get(structureListAtomV2).getItems(),
        );
      }
      if (savedStructures.length > 0 && !forceFetch) {
        this.items = savedStructures;
      } else {
        const nations: Structure[] = await getAllStructuresFetch(searchName);
        this.addMany(nations);
        this.addToStructureListAtom(nations);
      }
      this.sortStructures(this.sorting);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new StructureListModel(this.items);
    }
  };

  addToStructureListAtom = (list: Structure[]) => {
    const updatedList = myStore.get(structureListAtomV2).addMany(list);
    myStore.set(structureListAtomV2, new StructureListModel(updatedList));
  };

  private add(item: Structure) {
    if (!this.items.some((i) => i.officialId === item.officialId)) {
      this.items.push(new StructureModel(item));
    }
  }
  addMany(items: Structure[]) {
    items.forEach((item) => this.addOrUpdate(item));
    return this.items;
  }
  addOrUpdate(item: Structure) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new StructureModel(item);
    } else {
      this.add(item);
    }
    return this.items;
  }

  sortStructures = (selectOption: number) => {
    switch (selectOption) {
      case STRUCTURE_SORTIING.ascAlpha.id:
        sortByName(this.items, true);
        break;
      case STRUCTURE_SORTIING.descAlpha.id:
        sortByName(this.items, false);
        break;
      case STRUCTURE_SORTIING.ascDate.id:
        sortByCreatedAt(this.items, true);
        break;
      case STRUCTURE_SORTIING.descDate.id:
        sortByCreatedAt(this.items, false);
        break;
      default:
        break;
    }
    this.sorting = selectOption;
    return new StructureListModel(this.items, this.sorting);
  };
}
