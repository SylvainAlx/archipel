import { bannedCitizensAtom, loadingAtom, myStore } from "../../settings/store";
import { getBannedUsersFetch } from "./adminFetch";

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
