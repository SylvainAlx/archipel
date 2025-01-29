import {
  getAllCitizensFetch,
  getBannedUsersFetch,
  getNationCitizensFetch,
} from "../../services/userServices";
import { CITIZEN_SORTING } from "../../settings/sorting";
import {
  bannedCitizensAtom,
  loadingAtom,
  myStore,
  statsAtom,
  userListAtomV2,
} from "../../settings/store";
import { Nation } from "../../types/typNation";
import { User } from "../../types/typUser";
import { errorCatching } from "../../utils/displayInfos";
import { findElementsByName } from "../../utils/functions";
import { sortByCreatedAt, sortByName } from "../../utils/sorting";
import { NationModel } from "../nationModel";
import { UserModel } from "../userModel";
import { ListModel } from "./listModel";

export class UserListModel extends ListModel {
  constructor(
    list: UserModel[] | User[] = [],
    sorting: number = CITIZEN_SORTING.descDate.id,
  ) {
    super();
    this.items = list;
    this.sorting = sorting;
  }
  loadUserList = async (searchName: string) => {
    myStore.set(loadingAtom, true);
    try {
      this.items = [];
      let savedUsers: UserModel[] = [];
      if (searchName != "") {
        savedUsers = findElementsByName(
          searchName,
          myStore.get(userListAtomV2).getItems(),
        );
      }
      if (searchName === "") {
        savedUsers = myStore.get(userListAtomV2).getItems();
      }
      if (
        savedUsers.length > 0 &&
        savedUsers.length === myStore.get(statsAtom).counts.citizens
      ) {
        this.addMany(savedUsers);
      } else {
        const users: User[] = await getAllCitizensFetch(searchName);
        const updatedList = myStore.get(userListAtomV2).addMany(users);
        updatedList != undefined && myStore.set(userListAtomV2, updatedList);
        this.addMany(users);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new UserListModel(this.items);
    }
  };
  loadNationUserList = async (nation: Nation | NationModel) => {
    myStore.set(loadingAtom, true);
    try {
      this.items = [];
      const savedNationCitizenList: User[] = [];
      myStore
        .get(userListAtomV2)
        .getItems()
        .forEach((user) => {
          if (user.citizenship.nationId === nation.officialId) {
            savedNationCitizenList.push(user);
          }
        });
      if (savedNationCitizenList.length > 0) {
        this.items = savedNationCitizenList;
      } else {
        const resp: User[] = await getNationCitizensFetch(nation.officialId);
        if (resp.length > 0) {
          this.addMany(resp);
        }
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new UserListModel(this.items);
    }
  };
  loadBannedCitizensAtom = async () => {
    myStore.set(loadingAtom, true);
    try {
      const bannedUers: User[] = await getBannedUsersFetch();
      myStore.set(bannedCitizensAtom, new UserListModel(bannedUers));
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
    }
  };
  private add(item: User) {
    this.items.push(new UserModel(item));
  }
  addMany(items: User[]) {
    items.forEach((item) => this.addOrUpdate(item));
  }
  addOrUpdate(item: User) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new UserModel(item);
    } else {
      this.add(item);
    }
    return this.items;
  }
  sortUsers = (selectOption: number) => {
    switch (selectOption) {
      case CITIZEN_SORTING.ascAlpha.id:
        sortByName(this.items, true);
        break;
      case CITIZEN_SORTING.descAlpha.id:
        sortByName(this.items, false);
        break;
      case CITIZEN_SORTING.ascDate.id:
        sortByCreatedAt(this.items, true);
        break;
      case CITIZEN_SORTING.descDate.id:
        sortByCreatedAt(this.items, false);
        break;
      default:
        break;
    }
    this.sorting = selectOption;
    return new UserListModel(this.items, this.sorting);
  };
}
