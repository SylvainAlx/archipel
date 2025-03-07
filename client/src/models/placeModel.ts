import i18n from "../i18n/i18n";
import {
  createPlaceFetch,
  deletePlaceFetch,
  getPlaceFetch,
  updatePlaceFetch,
} from "../services/placeService";
import { PLACE_TYPE } from "../settings/consts";
import {
  loadingAtom,
  myStore,
  nationListAtomV2,
  placeListAtomV2,
} from "../settings/store";
import { Nation } from "../types/typNation";
import { emptyPlace, Place } from "../types/typPlace";
import { errorCatching } from "../utils/displayInfos";
import { deleteImage } from "../utils/procedures";
import { successMessage } from "../utils/toasts";
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
  getPlaceTypeLabel = () => {
    const foundType = Object.values(PLACE_TYPE).find(
      (type) => type.id === this.type,
    );
    return foundType ? foundType.label : "";
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
      this.displayPlaceInfoByType(response.infoType);
      myStore.get(placeListAtomV2).addToPlaceListAtom([response.place]);
      myStore.get(nationListAtomV2).addToNationListAtom([response.nation]);
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
      this.displayPlaceInfoByType(response.infoType);
      myStore.get(placeListAtomV2).addToPlaceListAtom([response.place]);
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
      this.displayPlaceInfoByType(response.infoType);
      const updatedList = myStore
        .get(placeListAtomV2)
        .removeByOfficialId(response.place.officialId);
      myStore.set(placeListAtomV2, new PlaceListModel(updatedList));
      myStore.get(nationListAtomV2).addToNationListAtom([response.nation]);
      if (this.image != "") await deleteImage(this.image);
    } catch (error) {
      errorCatching(error);
    } finally {
      myStore.set(loadingAtom, false);
      return new PlaceModel(this);
    }
  };
  displayPlaceInfoByType = (type: string) => {
    switch (type) {
      case "new":
        successMessage(i18n.t("toasts.place.new"));
        break;
      case "update":
        successMessage(i18n.t("toasts.place.update"));
        break;
      case "delete":
        successMessage(i18n.t("toasts.place.delete"));
        break;
      default:
        break;
    }
  };
}
