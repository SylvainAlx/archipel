import {
  getAllPlacesFetch,
  getNationPlacesFetch,
} from "../../services/placeService";
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
  addToPlaceListAtom = (list: Place[]) => {
    const updatedList = myStore.get(placeListAtomV2).addMany(list);
    myStore.set(placeListAtomV2, new PlaceListModel(updatedList));
  };
  loadPlaceList = async (searchName: string) => {
    myStore.set(loadingAtom, true);
    try {
      this.items = [];
      const places: Place[] = await getAllPlacesFetch(searchName);
      this.addMany(places);
      this.addToPlaceListAtom(places);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceListModel(this.items);
    }
  };
  loadNationPlaces = async (nation: Nation) => {
    myStore.set(loadingAtom, true);
    try {
      const savedPlaces: PlaceModel[] = [];
      myStore
        .get(placeListAtomV2)
        .getItems()
        .forEach((place) => {
          if (place.nation === nation.officialId) {
            savedPlaces.push(place);
          }
        });
      if (savedPlaces.length > 0) {
        this.addMany(savedPlaces);
      } else {
        const places: Place[] = await getNationPlacesFetch(nation.officialId);
        this.addMany(places);
        this.addToPlaceListAtom(places);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceListModel(this.items);
    }
  };
  private add(item: Place) {
    this.items.push(new PlaceModel(item));
  }
  addMany(items: Place[]) {
    items.forEach((item) => this.addOrUpdate(item));
    return this.items;
  }
  addOrUpdate(item: Place) {
    const index = this.items.findIndex((i) => i.officialId === item.officialId);
    if (index > -1) {
      this.items[index] = new PlaceModel(item);
    } else {
      this.add(item);
    }
    return this.items;
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
        sortPlacesByCitizen(this, true);
        break;
      case 3:
        sortPlacesByCitizen(this, false);
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
