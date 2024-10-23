import i18n from "../../i18n/i18n";
import { SERVER_URL } from "../../settings/consts";
import {
  citizenFetchAtom,
  loadingAtom,
  myStore,
  nationFetchedAtom,
  placeFetchedAtom,
} from "../../settings/store";
import { GET_JWT } from "../../utils/functions";
import { errorMessage, successMessage } from "../../utils/toasts";
import { updateNation } from "../nation/nationAPI";
import { updatePlace } from "../place/placeAPI";
import { updateUser } from "../user/userAPI";

export interface deleteFileAPIProps {
  url: string;
  type: string;
}

export const deleteUploadedFile = ({ url, type }: deleteFileAPIProps) => {
  const uuid: string = url.replace("https://ucarecdn.com/", "");
  myStore.set(loadingAtom, true);
  deleteUploadedFileFetch(uuid)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      if (resp.statut === 200) {
        if (type === "avatar") {
          const citizen = myStore.get(citizenFetchAtom);
          const citizenUpdated = { ...citizen };
          citizenUpdated.avatar = "";
          updateUser(citizenUpdated);
        } else if (type === "flag") {
          const nation = myStore.get(nationFetchedAtom);
          const nationUpdated = { ...nation };
          nationUpdated.data.url.flag = "";
          updateNation(nationUpdated);
        } else if (type === "coatOfArms") {
          const nation = myStore.get(nationFetchedAtom);
          const nationUpdated = { ...nation };
          nationUpdated.data.url.coatOfArms = "";
          updateNation(nationUpdated);
        } else if (type === "map") {
          const nation = myStore.get(nationFetchedAtom);
          const nationUpdated = { ...nation };
          nationUpdated.data.url.map = "";
          updateNation(nationUpdated);
        } else if (type === "placeImage") {
          const place = myStore.get(placeFetchedAtom);
          const placeUpdated = { ...place };
          placeUpdated.image = "";
          updatePlace(placeUpdated);
        }
        successMessage(i18n.t("toasts.file.delete"));
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      errorMessage(error.message);
    });
};

export const deleteUploadedFileFetch = async (uuid: string) => {
  const jwt = GET_JWT();
  const resp = await fetch(`${SERVER_URL}/file/delete/${uuid}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};
