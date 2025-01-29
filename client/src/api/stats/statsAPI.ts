import { loadingAtom, myStore, statsAtom } from "../../settings/store";
import { errorCatching } from "../../utils/displayInfos";
import { getCountsFetch } from "./statsFetch";

export const getCounts = async () => {
  myStore.set(loadingAtom, true);
  try {
    const response = await getCountsFetch();
    const updatedStats = structuredClone(myStore.get(statsAtom));
    updatedStats.counts = response;
    myStore.set(statsAtom, updatedStats);
  } catch (error) {
    errorCatching(error);
  } finally {
    myStore.set(loadingAtom, false);
  }
};
