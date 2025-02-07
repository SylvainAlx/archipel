import { SERVER_URL } from "../settings/consts";
import { loadingAtom, myStore, statsAtom } from "../settings/store";
import { errorCatching } from "../utils/displayInfos";
import { handleFetchError } from "../utils/procedures";

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

const getCountsFetch = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/stats/counts`);
    await handleFetchError(resp);
    const result = await resp.json();
    return result;
  } catch (error) {
    throw error;
  }
};
