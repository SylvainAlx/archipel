import { comOptions } from "../../settings/lists";
import {
  comFetchedListAtom,
  comsListAtom,
  loadingAtom,
  myStore,
} from "../../settings/store";
import { Com } from "../../types/typCom";
import { updateOrCreateComInMemory } from "../../utils/atomArrayFunctions";
import { successMessage } from "../../utils/toasts";
import {
  banContentFetch,
  getAllAdminComsFetch,
  reportContentFetch,
} from "./adminFetch";

export const getAdminComs = async () => {
  const savedComList: Com[] = [];
  myStore.get(comsListAtom).forEach((com) => {
    if (com.comType === comOptions[0].id) {
      savedComList.push(com);
    }
  });
  if (savedComList.length > 0) {
    myStore.set(comFetchedListAtom, savedComList);
  } else {
    try {
      myStore.set(loadingAtom, true);
      let response: [Com];
      response = await getAllAdminComsFetch();
      myStore.set(loadingAtom, false);
      if (response != undefined) {
        response.forEach((com: Com) => {
          updateOrCreateComInMemory(com);
        });
        myStore.set(comFetchedListAtom, response);
      }
    } catch (error) {
      myStore.set(loadingAtom, false);
      console.error(error);
    }
  }
};

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
