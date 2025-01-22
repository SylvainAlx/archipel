import {
  getAllPlacesFetch,
  getNationPlacesFetch,
} from "../../services/placeServices";
import { PLACE_SORTING } from "../../settings/sorting";
import { loadingAtom, myStore, placeListAtomV2 } from "../../settings/store";
import { Nation } from "../../types/typNation";
import { Place } from "../../types/typPlace";
import { errorCatching } from "../../utils/displayInfos";
import {
  sortByCreatedAt,
  sortByName,
  sortPlacesByCitizen,
} from "../../utils/sorting";
import { PlaceModel } from "../placeModel";
import { ListModel } from "./listModel";

export class PlaceListModel extends ListModel {
  constructor(
    list: PlaceModel[] | Place[] = [],
    sorting: number = PLACE_SORTING.descDate.id,
  ) {
    super();
    this.items = list;
    this.sorting = sorting;
  }

  loadPlaceList = async (searchName: string) => {
    myStore.set(loadingAtom, true);
    try {
      const places: Place[] = await getAllPlacesFetch(searchName);
      const updatedList = myStore.get(placeListAtomV2).addMany(places);
      updatedList != undefined && myStore.set(placeListAtomV2, updatedList);
      this.addMany(places);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceListModel(this.items);
    }
  };

  loadNationPlaces = async (nation: Nation) => {
    const savedNationPlacesList: Place[] = [];
    myStore
      .get(placeListAtomV2)
      .getItems()
      .forEach((place) => {
        if (place.nation === nation.officialId) {
          savedNationPlacesList.push(place);
        }
      });
    if (
      savedNationPlacesList.length > 0 &&
      nation.data.roleplay.places === savedNationPlacesList.length
    ) {
      this.addMany(savedNationPlacesList);
    } else {
      myStore.set(loadingAtom, true);
      try {
        const places: Place[] = await getNationPlacesFetch(nation.officialId);
        const updatedList = myStore.get(placeListAtomV2).addMany(places);
        updatedList != undefined && myStore.set(placeListAtomV2, updatedList);
        this.addMany(places);
      } catch (error) {
        errorCatching(error);
      } finally {
        myStore.set(loadingAtom, false);
        return new PlaceListModel(this.items);
      }
    }
  };

  add(item: Place) {
    this.items.push(new PlaceModel(item));
    return this.items;
  }
  addMany(items: Place[]) {
    items.forEach((item) => this.addOrUpdate(item));
  }
  private addOrUpdate(item: Place) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new PlaceModel(item);
    } else {
      this.add(item);
    }
  }

  sortPlaces = (selectOption: number) => {
    switch (selectOption) {
      case PLACE_SORTING.ascAlpha.id:
        sortByName(this.items, true);
        break;
      case PLACE_SORTING.descAlpha.id:
        sortByName(this.items, false);
        break;
      case 2:
        sortPlacesByCitizen(this.items, true);
        break;
      case 3:
        sortPlacesByCitizen(this.items, false);
        break;
      case PLACE_SORTING.ascDate.id:
        sortByCreatedAt(this.items, true);
        break;
      case PLACE_SORTING.descDate.id:
        sortByCreatedAt(this.items, false);
        break;
      default:
        break;
    }
    this.sorting = selectOption;
    return new PlaceListModel(this.items, this.sorting);
  };
}
