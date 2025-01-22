import { bannedCitizensAtom, loadingAtom, myStore } from "../../settings/store";
import { successMessage } from "../../utils/toasts";
import {
  banContentFetch,
  getBannedUsersFetch,
  reportContentFetch,
} from "./adminFetch";

export const reportContent = async (
  contentOfficialId: string,
  reverse = false,
) => {
  try {
    await reportContentFetch(contentOfficialId, reverse);
    reverse
      ? successMessage("signalement retiré et contenu affiché")
      : successMessage("contenu signalé et rendu inaccessible");
  } catch (error) {
    console.error(error);
  }
};

export const banContent = async (
  contentOfficialId: string,
  reverse = false,
) => {
  try {
    await banContentFetch(contentOfficialId, reverse);
    reverse
      ? successMessage(`Réindexation du contenu ${contentOfficialId}`)
      : successMessage(`désindexation du contenu ${contentOfficialId}`);
  } catch (error) {
    console.error(error);
  }
};

export const getBannedUsers = async () => {
  myStore.set(loadingAtom, true);
  getBannedUsersFetch()
    .then((data) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        myStore.set(bannedCitizensAtom, data);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
    });
};
