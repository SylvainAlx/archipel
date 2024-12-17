import i18n from "../../i18n/i18n";
import { COM_TYPE } from "../../settings/consts";
import {
  citizenFetchAtom,
  loadingAtom,
  myStore,
  nationFetchedAtom,
  nationsListAtom,
  nationsListFetchedAtom,
  sessionAtom,
  Stats,
  statsAtom,
  tagListAtom,
} from "../../settings/store";
import {
  EmptyNation,
  Hashtag,
  Nation,
  NewNationPayload,
} from "../../types/typNation";
import { User } from "../../types/typUser";
import {
  spliceByOfficialId,
  updateOrCreateNationInMemory,
} from "../../utils/atomArrayFunctions";
import { displayNationInfoByType } from "../../utils/displayInfos";

import {
  findElementOfAtomArray,
  findElementsByName,
  findNationsByTag,
} from "../../utils/functions";
import { createNewCom } from "../communication/comAPI";
import {
  createNationFetch,
  DeleteSelfFetch,
  getAllNationsFetch,
  getAllNationTagsFetch,
  getNationsCountFetch,
  getOneNationFetch,
  updateNationFetch,
} from "./nationFetch";

export const getNationsCount = () => {
  myStore.set(loadingAtom, true);
  getNationsCountFetch()
    .then((response: number) => {
      const updatedStats: Stats = { ...myStore.get(statsAtom) };
      updatedStats.counts.nations = response;
      myStore.set(statsAtom, updatedStats);
      myStore.set(loadingAtom, false);
    })
    .catch((error: { infoType: string }) => {
      myStore.set(loadingAtom, false);
      displayNationInfoByType(error.infoType);
    });
};

export const createNation = (payload: NewNationPayload) => {
  myStore.set(loadingAtom, true);
  createNationFetch(payload)
    .then((resp: { nation: Nation; user: User; infoType: string }) => {
      if (resp.nation && resp.user && resp.infoType) {
        myStore.set(nationsListAtom, [
          ...myStore.get(nationsListAtom),
          resp.nation,
        ]);
        myStore.set(nationFetchedAtom, resp.nation);
        myStore.set(citizenFetchAtom, resp.user);
        const session = myStore.get(sessionAtom);
        myStore.set(sessionAtom, {
          nation: resp.nation,
          user: resp.user,
          jwt: session.jwt,
        });
      }
      myStore.set(loadingAtom, false);
      displayNationInfoByType(resp.infoType);
      createNewCom({
        comType: COM_TYPE.userPrivate.id,
        origin: resp.nation.officialId,
        destination: resp.user.officialId,
        title: i18n.t("coms.nationCreate.title") + resp.nation.name,
        message: i18n.t("coms.nationCreate.message"),
      });
    })
    .catch((error: { infoType: string }) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayNationInfoByType(error.infoType);
    });
};

export const getNation = (id: string) => {
  myStore.set(loadingAtom, true);
  const nation = findElementOfAtomArray(id, myStore.get(nationsListAtom));
  if (nation === undefined || nation === null) {
    getOneNationFetch(id)
      .then((resp: Nation) => {
        myStore.set(nationFetchedAtom, resp);
        updateOrCreateNationInMemory(resp);
        myStore.set(loadingAtom, false);
      })
      .catch((error) => {
        myStore.set(nationFetchedAtom, EmptyNation);
        displayNationInfoByType(error.infoType);
        myStore.set(loadingAtom, false);
      });
  } else {
    myStore.set(loadingAtom, false);
    myStore.set(nationFetchedAtom, nation);
  }
};

export const getNations = (searchName: string, searchTag: string) => {
  let nations: Nation[] = [];
  if (searchName != "") {
    nations = findElementsByName(searchName, myStore.get(nationsListAtom));
  }
  if (searchTag != "") {
    nations = findNationsByTag(searchTag, myStore.get(nationsListAtom));
  }
  if (searchName === "" && searchTag === "") {
    nations = myStore.get(nationsListAtom);
  }
  if (nations.length === myStore.get(statsAtom).counts.nations) {
    myStore.set(nationsListFetchedAtom, nations);
  } else {
    myStore.set(loadingAtom, true);
    getAllNationsFetch(searchName, searchTag)
      .then((resp: Nation[]) => {
        if (resp != undefined) {
          searchName === "" &&
            searchTag === "" &&
            myStore.set(nationsListAtom, resp);
          myStore.set(nationsListFetchedAtom, resp);
        }
        myStore.set(loadingAtom, false);
      })
      .catch((error) => {
        myStore.set(loadingAtom, false);
        console.error(error);
        displayNationInfoByType(error.infoType);
      });
  }
};

export const updateNation = async (payload: Nation) => {
  try {
    myStore.set(loadingAtom, true);
    const response = await updateNationFetch(payload);
    myStore.set(loadingAtom, false);
    if (response.infoType === "update") {
      myStore.set(nationFetchedAtom, response.nation);
      const session = myStore.get(sessionAtom);
      myStore.set(sessionAtom, { ...session, nation: response.nation });
      updateOrCreateNationInMemory(response.nation);
      displayNationInfoByType(response.infoType);
    } else {
      displayNationInfoByType(response.infoType);
    }
  } catch (error) {
    myStore.set(loadingAtom, false);
    console.error(error);
  }
};

export const deleteSelfNation = () => {
  myStore.set(loadingAtom, true);
  DeleteSelfFetch()
    .then((resp: { user: User; infoType: string }) => {
      if (resp.infoType === "delete") {
        const session = myStore.get(sessionAtom);
        if (session.nation) {
          const updatedNations = spliceByOfficialId(
            session.nation.officialId,
            myStore.get(nationsListAtom),
          );
          myStore.set(nationsListAtom, updatedNations);
        }
        displayNationInfoByType(resp.infoType);
        myStore.set(nationFetchedAtom, EmptyNation);
        myStore.set(citizenFetchAtom, resp.user);
        myStore.set(sessionAtom, {
          nation: EmptyNation,
          user: resp.user,
          jwt: session.jwt,
        });
        createNewCom({
          comType: COM_TYPE.userPrivate.id,
          origin: session.nation.officialId,
          destination: resp.user.officialId,
          title: i18n.t("coms.nationDelete.title") + session.nation.name,
          message: i18n.t("coms.nationDelete.message"),
        });
      }

      myStore.set(loadingAtom, false);
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayNationInfoByType(error.infoType);
    });
};

export const getAllNationTags = () => {
  myStore.set(loadingAtom, true);
  getAllNationTagsFetch()
    .then((data: { _id: string; occurrence: number }[]) => {
      myStore.set(loadingAtom, false);
      if (data != undefined) {
        const inventory: Hashtag[] = [];
        data.forEach((tag) => {
          inventory.push({ label: tag._id, occurrence: tag.occurrence });
        });
        myStore.set(tagListAtom, inventory);
      }
    })
    .catch((error) => {
      myStore.set(loadingAtom, false);
      console.error(error);
      displayNationInfoByType(error.infoType);
    });
};
