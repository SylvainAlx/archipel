import { comListAtomV2, loadingAtom, myStore } from "../../settings/store";
import { ComModel } from "../comModel";
import {
  getAllAdminComsFetch,
  getComsFetch,
  getLastNewsFetch,
  getPublicComsByOriginFetch,
} from "../../services/comService";
import { errorCatching } from "../../utils/displayInfos";
import { COM_SORTING } from "../../settings/sorting";
import { ListModel } from "./listModel";
import { Com } from "../../types/typCom";
import { sortByCreatedAt } from "../../utils/sorting";
import { comMessage } from "../../utils/toasts";

export class ComListModel extends ListModel {
  constructor(
    list: ComModel[] = [],
    sorting: number = COM_SORTING.descDate.id,
  ) {
    super();
    this.items = list;
    this.sorting = sorting;
  }
  addToComListAtom = (list: Com[]) => {
    const updatedList = myStore.get(comListAtomV2).addMany(list);
    myStore.set(comListAtomV2, new ComListModel(updatedList));
  };
  getUnreadCountByType(comTypes: number[], destinationId: string): number {
    return this.items.filter(
      (com) =>
        comTypes.includes(com.comType) &&
        !com.read &&
        com.destination === destinationId,
    ).length;
  }
  getLastNews = async () => {
    const news: Com[] = await getLastNewsFetch();
    const newsDate = localStorage.getItem("newsDate");
    if (news.length > 0) {
      if (newsDate) {
        const lastNewsDate = new Date(JSON.parse(newsDate));
        news
          .filter(
            (element) =>
              new Date(element.createdAt).getTime() > lastNewsDate.getTime(),
          )
          .forEach((message) => {
            comMessage(message.title + " : " + message.message);
          });
      } else {
        news.forEach((message) => {
          comMessage(message.title + " : " + message.message);
        });
      }

      localStorage.setItem("newsDate", JSON.stringify(news[0].createdAt));
    }
  };
  loadComList = async (
    originId: string,
    destinationId: string,
    comType: number[],
    isJwtRequired: boolean = true,
    useSavedComs: boolean = false,
  ) => {
    const savedComList: ComModel[] = [];
    myStore
      .get(comListAtomV2)
      .getItems()
      .forEach((com) => {
        if (
          com.origin === originId ||
          (originId === "" && com.destination === destinationId) ||
          (destinationId === "" && comType.includes(com.comType))
        ) {
          savedComList.push(com);
        }
      });
    if (useSavedComs && savedComList.length > 0) {
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
        this.addMany(coms);
        this.addToComListAtom(coms);
      } catch (error) {
        errorCatching(error);
      } finally {
        myStore.set(loadingAtom, false);
      }
    }
    return new ComListModel(this.items);
  };
  loadAdminComList = async () => {
    try {
      myStore.set(loadingAtom, true);
      const response = await getAllAdminComsFetch();
      this.addMany(response);
      this.addToComListAtom(response);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new ComListModel(this.items);
    }
  };
  loadNationComList = async (
    origin: string,
    destination: string,
    comTypes: number[],
    isJwtRequired: boolean = true,
  ) => {
    try {
      myStore.set(loadingAtom, true);
      const response = await this.loadComList(
        origin,
        destination,
        comTypes,
        isJwtRequired,
        false,
      );
      if (response) {
        this.addMany(response.getItems());
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new ComListModel(this.items);
    }
  };
  private add(item: Com) {
    if (!this.items.some((i) => i.officialId === item.officialId)) {
      this.items.push(new ComModel(item));
    }
  }
  addMany(items: Com[]) {
    items.forEach((item) => this.addOrUpdate(item));
    return this.items;
  }
  addOrUpdate(item: Com) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new ComModel(item);
    } else {
      this.add(item);
    }
    return this.items;
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
