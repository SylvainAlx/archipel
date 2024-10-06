/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadingAtom, myStore, tileListAtom } from "../../settings/store";
import { getNationTileFetch } from "./tileFetch";

export const getNationTile = async (nationOfficialId: string) => {
  myStore.set(loadingAtom, true);
  getNationTileFetch(nationOfficialId)
    .then((data: any) => {
      myStore.set(loadingAtom, false);
      myStore.set(tileListAtom, data);
    })
    .catch((error) => {
      myStore.set(loadingAtom, true);
      console.log(error);
    });
};
