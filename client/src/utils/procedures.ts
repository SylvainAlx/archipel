import i18n from "../i18n/i18n";
import { ComModel } from "../models/comModel";
import { UserModel } from "../models/userModel";
import { deleteUploadedFileFetch } from "../services/fileServices";
import { COM_TYPE } from "../settings/consts";
import { confirmBox, loadingAtom, myStore } from "../settings/store";
import { Com } from "../types/typCom";
import { Nation } from "../types/typNation";
import { User } from "../types/typUser";
import { errorCatching } from "./displayInfos";
import {
  GET_LAST_WATCH,
  getComTypeLabelById,
  isDateLessThanOneMonthOld,
} from "./functions";
import { comMessage, successMessage } from "./toasts";

export const SET_LAST_WATCH = (param: string, date: Date) => {
  localStorage.setItem(param, date.toString());
};

export const approveCitizenship = (citizen: UserModel) => {
  const payload = {
    officialId: citizen.officialId,
    nationId: citizen.citizenship.nationId,
    status: 1,
  };
  myStore.set(confirmBox, {
    action: "",
    text: i18n.t("components.modals.confirmModal.approveCitizenship"),
    result: "",
    actionToDo: async () => {
      await citizen.changeStatus(payload);
    },
  });
};

export const declineCitizenship = (citizen: UserModel) => {
  const payload = {
    officialId: citizen.officialId,
    nationId: citizen.citizenship.nationId,
    status: -1,
  };
  myStore.set(confirmBox, {
    action: "",
    text: i18n.t("components.modals.confirmModal.declineCitizenship"),
    result: "",
    actionToDo: async () => {
      await citizen.changeStatus(payload);
    },
  });
};

export const deleteImage = async (url: string): Promise<boolean> => {
  const uuid: string = url.replace("https://ucarecdn.com/", "");
  myStore.set(loadingAtom, true);
  try {
    const response = await deleteUploadedFileFetch(uuid);
    successMessage(i18n.t("toasts.file.delete"));
    return response.statut === 200;
  } catch (error) {
    errorCatching(error);
    return false;
  } finally {
    myStore.set(loadingAtom, false);
  }
};

export const displayUnwatchedComs = (officialId: string, comList: Com[]) => {
  const lastVisit = GET_LAST_WATCH(officialId);
  let count = 0;
  comList.forEach((com) => {
    if (
      (!lastVisit || com.createdAt.toString() > lastVisit.toISOString()) &&
      isDateLessThanOneMonthOld(com.createdAt) &&
      com.destination === officialId
    ) {
      const comDate = new Date(com.createdAt);
      const comType = getComTypeLabelById(com.comType);
      comMessage(
        `${comDate.toLocaleString(i18n.language)} - [${comType && comType}] - ${com.title} - ${com.message}`,
      );
      count++;
    }
  });
  if (count > 0) {
    const date = new Date();
    SET_LAST_WATCH(officialId, date);
  }
};

export const createComByStatus = (
  status: number,
  nation: Nation,
  user: User,
) => {
  if (status === 1) {
    const newCom = new ComModel({
      comType: COM_TYPE.nationPrivate.id,
      origin: nation.officialId,
      destination: nation.officialId,
      title: i18n.t("coms.nationJoin.title"),
      message: user.name + i18n.t("coms.nationJoin.message") + nation.name,
    });
    newCom.baseInsert();
  } else if (user.citizenship.status === -1) {
    const newCom = new ComModel({
      comType: COM_TYPE.nationPrivate.id,
      origin: nation.officialId,
      destination: nation.officialId,
      title: i18n.t("coms.nationLeave.title"),
      message: user.name + i18n.t("coms.nationLeave.message") + nation.name,
    });
    newCom.baseInsert();
  } else {
    const newCom1 = new ComModel({
      comType: COM_TYPE.userPrivate.id,
      origin: nation.officialId,
      destination: nation.owner,
      title: i18n.t("coms.nationToAccept.title") + nation.name,
      message: user.name + i18n.t("coms.nationToAccept.message"),
    });
    newCom1.baseInsert();
    const newCom2 = new ComModel({
      comType: COM_TYPE.userPrivate.id,
      origin: nation.officialId,
      destination: user.officialId,
      title: i18n.t("coms.nationToWait.title") + nation.name,
      message: i18n.t("coms.nationToWait.message"),
    });
    newCom2.baseInsert();
  }
};

export const clearImagesInCache = () => {
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith("https://ucarecdn.com")) {
      localStorage.removeItem(key);
    }
  }
};

export const handleShare = async (label: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title, // Titre de la page
        text: label,
        url: window.location.href, // URL actuelle
      });
      console.log("Contenu partagé avec succès !");
    } catch (error) {
      console.error("Erreur lors du partage :", error);
    }
  } else {
    console.warn("L'API Web Share n'est pas supportée sur ce navigateur.");
    alert(
      "Votre navigateur ne prend pas en charge la fonctionnalité de partage.",
    );
  }
};
