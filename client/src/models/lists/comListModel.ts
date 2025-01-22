import { comListAtomV2, loadingAtom, myStore } from "../../settings/store";
import { ComModel } from "../comModel";
import {
  getAllAdminComsFetch,
  getComsFetch,
  getPublicComsByOriginFetch,
} from "../../services/comServices";
import { errorCatching } from "../../utils/displayInfos";
import { COM_SORTING } from "../../settings/sorting";
import { ListModel } from "./listModel";
import { COM_TYPE } from "../../settings/consts";
import { Com } from "../../types/typCom";
import { sortByCreatedAt } from "../../utils/sorting";

export class ComListModel extends ListModel {
  constructor(
    list: ComModel[] = [],
    sorting: number = COM_SORTING.descDate.id,
  ) {
    super();
    this.items = list;
    this.sorting = sorting;
  }

  loadComList = async (
    originId: string,
    destinationId: string,
    comType: number[],
    isJwtRequired: boolean = true,
  ) => {
    const savedComList: ComModel[] = [];
    myStore
      .get(comListAtomV2)
      .getItems()
      .forEach((com) => {
        if (
          com.origin === originId &&
          com.destination === destinationId &&
          comType.includes(com.comType)
        ) {
          savedComList.push(com);
        }
      });
    if (savedComList.length > 0) {
      this.addMany(savedComList);
    } else {
      myStore.set(loadingAtom, true);
      try {
        let coms = [];
        if (isJwtRequired) {
          coms = await getComsFetch(originId, destinationId, comType);
        } else {
          coms = await getPublicComsByOriginFetch(originId);
        }
        const updatedList = myStore.get(comListAtomV2).addMany(coms);
        updatedList != undefined && myStore.set(comListAtomV2, updatedList);
        this.addMany(coms);
      } catch (error) {
        errorCatching(error);
      } finally {
        myStore.set(loadingAtom, false);
        return new ComListModel(this.items);
      }
    }
  };

  loadAdminComList = async () => {
    const savedComList: ComModel[] = [];
    myStore
      .get(comListAtomV2)
      .getItems()
      .forEach((com) => {
        if (com.comType === COM_TYPE.admin.id) {
          savedComList.push(com);
        }
      });
    if (savedComList.length > 0) {
      this.addMany(savedComList);
    } else {
      try {
        myStore.set(loadingAtom, true);
        const response = await getAllAdminComsFetch();
        const updatedList = myStore.get(comListAtomV2).addMany(response);
        updatedList != undefined && myStore.set(comListAtomV2, updatedList);
        this.addMany(response);
      } catch (error) {
        errorCatching(error);
      } finally {
        myStore.set(loadingAtom, false);
        return new ComListModel(this.items);
      }
    }
  };

  add(item: Com) {
    this.items.push(new ComModel(item));
    return this.items;
  }
  addMany(items: Com[]) {
    items.forEach((item) => this.addOrUpdate(item));
  }
  private addOrUpdate(item: Com) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new ComModel(item);
    } else {
      this.add(item);
    }
  }

  sortComs = (selectOption: number) => {
    switch (selectOption) {
      case COM_SORTING.ascDate.id:
        sortByCreatedAt(this.items, true);
        break;
      case COM_SORTING.descDate.id:
        sortByCreatedAt(this.items, false);
        break;
      default:
        break;
    }
    this.sorting = selectOption;
    return new ComListModel(this.items, this.sorting);
  };
}
