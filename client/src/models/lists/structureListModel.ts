import { myStore, structureListAtomV2 } from "../../settings/store";
import { Structure } from "../../types/typStructure";
import { StructureModel } from "../structureModel";
import { ListModel } from "./listModel";

export class StructureListModel extends ListModel {
  constructor(list: StructureModel[] | Structure[] = [], sorting: number = 0) {
    super();
    this.items = list;
    this.sorting = sorting;
  }

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
}
