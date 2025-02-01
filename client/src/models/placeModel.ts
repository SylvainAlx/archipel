import {
  createPlaceFetch,
  deletePlaceFetch,
  getPlaceFetch,
  updatePlaceFetch,
} from "../services/placeService";
import { loadingAtom, myStore, placeListAtomV2 } from "../settings/store";
import { Nation } from "../types/typNation";
import { emptyPlace, Place } from "../types/typPlace";
import { displayPlaceInfoByType, errorCatching } from "../utils/displayInfos";
import { deleteImage } from "../utils/procedures";
import { CommonModel } from "./commonModel";
import { PlaceListModel } from "./lists/placeListModel";

export class PlaceModel extends CommonModel implements Place {
  _id?: string | undefined;
  nation!: string;
  parentId!: string;
  type!: number;
  population!: number;
  name!: string;
  description!: string;
  image!: string;
  isFree!: boolean;

  constructor(data: Partial<Place> = {}) {
    super();
    const defaultData = { ...emptyPlace, ...data };
    Object.assign(this, defaultData);
  }

  loadPlace = async (officialId: string) => {
    myStore.set(loadingAtom, true);
    try {
      const place = myStore
        .get(placeListAtomV2)
        .getItems()
        .find((p) => p.officialId === officialId);
      if (place) {
        this.updateFields(place);
      } else {
        const response: { place: Place } = await getPlaceFetch(officialId);
        this.updateFields(response.place);
        myStore.get(placeListAtomV2).addToPlaceListAtom([response.place]);
      }
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceModel(this);
    }
  };
  updateFields(fields: Partial<PlaceModel | Place>) {
    Object.assign(this, fields);
    return this;
  }
  baseInsert = async () => {
    myStore.set(loadingAtom, true);
    try {
      const response: { place: Place; nation: Nation; infoType: string } =
        await createPlaceFetch(this);
      this.updateFields(response.place);
      displayPlaceInfoByType(response.infoType);
      myStore.get(placeListAtomV2).addToPlaceListAtom([response.place]);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceModel(this);
    }
  };
  baseUpdate = async () => {
    myStore.set(loadingAtom, true);
    try {
      const response: { place: Place; infoType: string } =
        await updatePlaceFetch(this);
      this.updateFields(response.place);
      displayPlaceInfoByType(response.infoType);
      const updatedList = myStore
        .get(placeListAtomV2)
        .updateItemByOfficialId(new PlaceModel(response.place));
      myStore.set(placeListAtomV2, updatedList);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceModel(this);
    }
  };
  baseDelete = async () => {
    myStore.set(loadingAtom, true);
    try {
      const response: { place: Place; nation: Nation; infoType: string } =
        await deletePlaceFetch(this.officialId);
      displayPlaceInfoByType(response.infoType);
      const updatedList = myStore
        .get(placeListAtomV2)
        .removeByOfficialId(response.place.officialId);
      myStore.set(placeListAtomV2, new PlaceListModel(updatedList));
      this.image != "" && (await deleteImage(this.image));
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceModel(this);
    }
  };
}
