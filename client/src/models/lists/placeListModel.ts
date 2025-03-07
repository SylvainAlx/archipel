import {
  getAllPlacesFetch,
  getNationPlacesFetch,
} from "../../services/placeService";
import { PLACE_TYPE } from "../../settings/consts";
import { PLACE_SORTING } from "../../settings/sorting";
import { loadingAtom, myStore, placeListAtomV2 } from "../../settings/store";
import { LabelId, Nation } from "../../types/typNation";
import { Place } from "../../types/typPlace";
import { errorCatching } from "../../utils/displayInfos";
import { findElementsByName } from "../../utils/functions";
import {
  sortByCreatedAt,
  sortByName,
  sortPlacesByCitizen,
} from "../../utils/sorting";
import { NationModel } from "../nationModel";
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
  loadPlaceList = async (searchName: string, forceFetch: boolean = true) => {
    myStore.set(loadingAtom, true);
    try {
      let savedPlaces: PlaceModel[] = [];
      if (searchName != "") {
        savedPlaces = findElementsByName(
          searchName,
          myStore.get(placeListAtomV2).getItems(),
        );
      }
      if (searchName === "") {
        savedPlaces = myStore.get(placeListAtomV2).getItems();
      }
      if (savedPlaces.length > 0 && !forceFetch) {
        this.items = savedPlaces;
      } else {
        const places: Place[] = await getAllPlacesFetch(searchName);
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
      if (
        savedPlaces.length > 0 &&
        savedPlaces.length === nation.data.roleplay.places
      ) {
        this.items = savedPlaces;
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
  getLabelIdPlaceList = (
    types: number[],
    nation?: NationModel,
    idToOmit?: string,
  ): LabelId[] => {
    const result: LabelId[] = [];
    this.items.forEach((place) => {
      types.forEach((type) => {
        if (place.type === type && place.officialId != idToOmit) {
          result.push({ id: place.officialId, label: place.name });
        }
      });
    });
    if (nation) result.push({ id: nation.officialId, label: nation.name });
    return result;
  };
  getTotalPopulation = (place: PlaceModel): number => {
    let total: number = 0;
    this.getItems().forEach((e) => {
      if (e.parentId === place.officialId) {
        total += e.population;
      }
    });
    return total + place.population;
  };
  getPlacesByParentId = (parentId: string) => {
    const places = this.getItems().filter(
      (place) => place.parentId === parentId,
    );
    return new PlaceListModel(places);
  };
  findPlaceName = (officialId: string, defaultName: string): string => {
    let name = defaultName;
    const foundPlace = this.getItems().find(
      (place) => place.officialId === officialId,
    );
    if (foundPlace) {
      name = foundPlace.name;
    }
    return name;
  };
  getCities = () => {
    const cities = this.getItems().filter(
      (place) => place.type === PLACE_TYPE.city.id,
    );
    return new PlaceListModel(cities);
  };
  private add(item: Place) {
    if (!this.items.some((i) => i.officialId === item.officialId)) {
      this.items.push(new PlaceModel(item));
    }
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
      case PLACE_SORTING.ascCtz.id:
        sortPlacesByCitizen(this, true);
        break;
      case PLACE_SORTING.descCtz.id:
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
