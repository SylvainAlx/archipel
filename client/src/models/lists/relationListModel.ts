import { getAllRelationsFetch } from "../../services/relationService";
import { loadingAtom, myStore, relationListAtomV2 } from "../../settings/store";
import { DiplomaticRelationship } from "../../types/typRelation";
import { errorCatching } from "../../utils/displayInfos";
import { RelationModel } from "../relationModel";
import { ListModel } from "./listModel";

export class RelationListModel extends ListModel {
  constructor(list: RelationModel[] | DiplomaticRelationship[] = []) {
    super();
    this.items = list;
  }
  loadRelationList = async (nationOfficialId: string) => {
    myStore.set(loadingAtom, true);
    try {
      let savedRelationList: DiplomaticRelationship[] = [];
      myStore
        .get(relationListAtomV2)
        .getItems()
        .forEach((relation) => {
          if (
            relation.nations.some(
              (nation: { officialId: string }) =>
                nation.officialId === nationOfficialId,
            )
          ) {
            savedRelationList.push(relation);
          }
        });
      if (savedRelationList.length > 0) {
        this.addMany(savedRelationList);
      } else {
        const relations: DiplomaticRelationship[] =
          await getAllRelationsFetch(nationOfficialId);
        this.addMany(relations);
        myStore.get(relationListAtomV2).addToRelationListAtom(relations);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new RelationListModel(this.items);
    }
  };
  addToRelationListAtom = (list: DiplomaticRelationship[]) => {
    const updatedList = myStore.get(relationListAtomV2).addMany(list);
    myStore.set(relationListAtomV2, new RelationListModel(updatedList));
  };
  private add(item: DiplomaticRelationship) {
    if (!this.items.some((i) => i.officialId === item.officialId)) {
      this.items.push(new RelationModel(item));
    }
  }
  addMany(items: DiplomaticRelationship[]) {
    items.forEach((item) => this.addOrUpdate(item));
    return this.items;
  }
  addOrUpdate(item: DiplomaticRelationship) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new RelationModel(item);
    } else {
      this.add(item);
    }
    return this.items;
  }
}
