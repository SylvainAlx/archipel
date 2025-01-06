import { createNewCom } from "../api/communication/comAPI";
import { deleteFileAPIProps } from "../api/files/fileAPI";
import { updateNation } from "../api/nation/nationAPI";
import { updatePlace } from "../api/place/placeAPI";
import { updateUser } from "../api/user/userAPI";
import i18next from "../i18n/i18n";
import i18n from "../i18n/i18n";
import { COM_TYPE } from "../settings/consts";
import { confirmBox, myStore, sessionAtom } from "../settings/store";
import { Com, ComPayload } from "../types/typCom";
import { LabelId, Nation, Regime } from "../types/typNation";
import { Place } from "../types/typPlace";
import { User } from "../types/typUser";
import {
  GET_LAST_WATCH,
  getComTypeLabelById,
  isDateLessThanOneMonthOld,
} from "./functions";
import { comMessage } from "./toasts";

export const SET_LAST_WATCH = (param: string, date: Date) => {
  localStorage.setItem(param, date.toString());
};

export const approveCitizenship = (citizen: User) => {
  const payload = {
    officialId: citizen.officialId,
    nationId: citizen.citizenship.nationId,
    status: 1,
  };
  myStore.set(confirmBox, {
    action: "changeStatus",
    text: i18n.t("components.modals.confirmModal.approveCitizenship"),
    result: "",
    payload,
  });
};

export const declineCitizenship = (citizen: User) => {
  const payload = {
    officialId: citizen.officialId,
    nationId: citizen.citizenship.nationId,
    status: -1,
  };
  myStore.set(confirmBox, {
    action: "changeStatus",
    text: i18n.t("components.modals.confirmModal.declineCitizenship"),
    result: "",
    payload,
  });
};

export const handleDeleteImage = ({ url, type }: deleteFileAPIProps) => {
  myStore.set(confirmBox, {
    action: "deleteFile",
    text: i18n.t("components.modals.confirmModal.deleteFile"),
    payload: url,
    result: "",
    target: type,
  });
};

export const updateElement = (
  destination: string,
  path: string,
  value: string | number | boolean | any[] | Regime[] | LabelId[],
  place?: Place,
  confirm?: boolean,
) => {
  const session = myStore.get(sessionAtom);
  const parties: string[] = path.split(".");
  let isOk = true;
  let objetCourant;
  let dernierePartie;
  switch (destination) {
    case "nation":
      const updatedNation: any = structuredClone(session.nation);
      objetCourant = updatedNation;
      for (let i = 0; i < parties.length - 1; i++) {
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant = objetCourant[parties[i]];
        } else {
          isOk = false;
          console.error(
            `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
          );
          break;
        }
      }
      dernierePartie = parties[parties.length - 1];
      if (typeof objetCourant === "object" && objetCourant !== null) {
        objetCourant[dernierePartie] = value;
      }

      if (isOk) {
        if (confirm) {
          myStore.set(confirmBox, {
            action: "updateNation",
            text: i18next.t("components.modals.confirmModal.updateNation"),
            result: "",
            target: "",
            payload: updatedNation,
          });
        } else {
          updateNation(updatedNation);
        }
      }

      break;
    case "citizen":
      // eslint-disable-next-line no-case-declarations
      const updatedUser: any = structuredClone(session.user);
      objetCourant = updatedUser;
      for (let i = 0; i < parties.length - 1; i++) {
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant = objetCourant[parties[i]];
        } else {
          isOk = false;
          console.error(
            `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
          );
          break;
        }
      }
      dernierePartie = parties[parties.length - 1];
      if (typeof objetCourant === "object" && objetCourant !== null) {
        objetCourant[dernierePartie] = value;
      }

      if (isOk) {
        if (confirm) {
          myStore.set(confirmBox, {
            action: "updateUser",
            text: i18n.t("components.modals.confirmModal.updateCitizen"),
            result: "",
            target: "",
            payload: updatedUser,
          });
        } else {
          updateUser(updatedUser);
        }
      }

      break;
    case "place":
      // eslint-disable-next-line no-case-declarations
      const updatedPlace: any = structuredClone(place);
      objetCourant = updatedPlace;
      for (let i = 0; i < parties.length - 1; i++) {
        if (typeof objetCourant === "object" && objetCourant !== null) {
          objetCourant = objetCourant[parties[i]];
        } else {
          isOk = false;
          console.error(
            `Chemin incorrect. Propriété ${parties[i]} non trouvée.`,
          );
          break;
        }
      }
      dernierePartie = parties[parties.length - 1];
      if (typeof objetCourant === "object" && objetCourant !== null) {
        objetCourant[dernierePartie] = value;
      }

      if (isOk) {
        if (confirm) {
          myStore.set(confirmBox, {
            action: "updatePlace",
            text: i18n.t("components.modals.confirmModal.updatePlace"),
            result: "",
            target: "",
            payload: updatedPlace,
          });
        } else {
          updatePlace(updatedPlace);
        }
      }
      break;
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
    const newCom: ComPayload = {
      comType: COM_TYPE.nationPrivate.id,
      origin: nation.officialId,
      destination: nation.officialId,
      title: i18n.t("coms.nationJoin.title"),
      message: user.name + i18n.t("coms.nationJoin.message") + nation.name,
    };
    createNewCom(newCom);
  } else if (user.citizenship.status === -1) {
    const newCom: ComPayload = {
      comType: COM_TYPE.nationPrivate.id,
      origin: nation.officialId,
      destination: nation.officialId,
      title: i18n.t("coms.nationLeave.title"),
      message: user.name + i18n.t("coms.nationLeave.message") + nation.name,
    };
    createNewCom(newCom);
  } else {
    const newCom1: ComPayload = {
      comType: COM_TYPE.userPrivate.id,
      origin: nation.officialId,
      destination: nation.owner,
      title: i18n.t("coms.nationToAccept.title") + nation.name,
      message: user.name + i18n.t("coms.nationToAccept.message"),
    };
    createNewCom(newCom1);
    const newCom2: ComPayload = {
      comType: COM_TYPE.userPrivate.id,
      origin: nation.officialId,
      destination: user.officialId,
      title: i18n.t("coms.nationToWait.title") + nation.name,
      message: i18n.t("coms.nationToWait.message"),
    };
    createNewCom(newCom2);
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
