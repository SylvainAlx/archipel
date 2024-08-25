import { SERVER_URL } from "../../settings/consts";
import { citizenFetchAtom, loadingAtom, myStore } from "../../settings/store";
import { GET_JWT } from "../../utils/functions";
import { errorMessage } from "../../utils/toasts";

export const deleteUploadedFile = (url: string) => {
  const uuid: string = url.replace("https://ucarecdn.com/", "");
  myStore.set(loadingAtom, true);
  deleteUploadedFileFetch(uuid)
    .then((resp) => {
      myStore.set(loadingAtom, false);
      if (resp.statut === 200) {
        const citizen = myStore.get(citizenFetchAtom);
        const citizenUpdated = { ...citizen };
        citizenUpdated.avatar = "";
        myStore.set(citizenFetchAtom, citizenUpdated);
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
