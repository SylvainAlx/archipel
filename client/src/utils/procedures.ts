import i18n from "../i18n/i18n";
import { ComModel } from "../models/comModel";
import { UserModel } from "../models/userModel";
import { deleteUploadedFileFetch } from "../services/fileService";
import { COM_TYPE, UPLOADCARE_URL } from "../settings/consts";
import { loadingAtom, myStore } from "../settings/store";
import { Nation } from "../types/typNation";
import { User } from "../types/typUser";
import { errorCatching } from "./displayInfos";
import { getDocumentTitle } from "./functions";
import { comMessage, successMessage } from "./toasts";

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

export const displayUnwatchedComs = (
  user: UserModel,
  comList: ComModel[],
  destinations: string[],
) => {
  comList.forEach((com) => {
    if (
      com.createdAt.toString() > user.lastVisitDate.toISOString() &&
      com.destination &&
      destinations.includes(com.destination)
    ) {
      const comDate = new Date(com.createdAt);
      const comType = com.getComTypeLabel();
      comMessage(
        `${comDate.toLocaleString(i18n.language)} - [${comType && comType.label}] - ${com.title} - ${com.message}`,
      );
    }
  });
};

export const createComByStatus = (
  AStatut: number,
  ANation: Nation,
  AUtilisateur: User,
): void => {
  const messages = {
    join: {
      title: i18n.t("coms.nationJoin.title"),
      message:
        AUtilisateur.name + i18n.t("coms.nationJoin.message") + ANation.name,
    },
    leave: {
      title: i18n.t("coms.nationLeave.title"),
      message:
        AUtilisateur.name + i18n.t("coms.nationLeave.message") + ANation.name,
    },
    toAccept: {
      title: i18n.t("coms.nationToAccept.title") + ANation.name,
      message: AUtilisateur.name + i18n.t("coms.nationToAccept.message"),
    },
    toWait: {
      title: i18n.t("coms.nationToWait.title") + ANation.name,
      message: i18n.t("coms.nationToWait.message"),
    },
  };

  const createCommunication = (
    comType: number,
    origin: string,
    destination: string,
    title: string,
    message: string,
  ): void => {
    new ComModel({ comType, origin, destination, title, message }).baseInsert();
  };

  if (AStatut === 1) {
    createCommunication(
      COM_TYPE.nationPrivate.id,
      ANation.officialId,
      ANation.officialId,
      messages.join.title,
      messages.join.message,
    );
    createCommunication(
      COM_TYPE.userPrivate.id,
      ANation.officialId,
      AUtilisateur.officialId,
      messages.join.title,
      messages.join.message,
    );
  } else if (AUtilisateur.citizenship.status === -1) {
    createCommunication(
      COM_TYPE.nationPrivate.id,
      ANation.officialId,
      ANation.officialId,
      messages.leave.title,
      messages.leave.message,
    );
    createCommunication(
      COM_TYPE.userPrivate.id,
      ANation.officialId,
      AUtilisateur.officialId,
      messages.leave.title,
      messages.leave.message,
    );
  } else {
    createCommunication(
      COM_TYPE.userPrivate.id,
      ANation.officialId,
      ANation.owner,
      messages.toAccept.title,
      messages.toAccept.message,
    );
    createCommunication(
      COM_TYPE.userPrivate.id,
      ANation.officialId,
      AUtilisateur.officialId,
      messages.toWait.title,
      messages.toWait.message,
    );
  }
};

export const clearImagesInCache = () => {
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith(UPLOADCARE_URL)) {
      localStorage.removeItem(key);
    }
  }
};

export const handleShare = async (label: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: label,
        url: window.location.href,
      });
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

export const createPageTitle = (aTitre: string) => {
  document.title = getDocumentTitle(aTitre);
};

export const handleFetchError = async (AResponse: Response) => {
  if (!AResponse.ok) {
    const errorPayload = await AResponse.json();
    throw new Error(JSON.stringify(errorPayload));
  }
};
