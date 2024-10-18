import i18n from "../i18n/i18n";
import { errorMessage, successMessage } from "./toasts";

export const displayUserInfoByType = (type: string) => {
  switch (type) {
    case "signin":
      successMessage(i18n.t("toasts.user.signIn"));
      break;
    case "signup":
      successMessage(i18n.t("toasts.user.signUp"));
      break;
    case "verify":
      successMessage(i18n.t("toasts.user.verify"));
      break;
    case "newPassword":
      successMessage(i18n.t("toasts.user.newPassword"));
      break;
    case "update":
      successMessage(i18n.t("toasts.user.update"));
      break;
    case "delete":
      successMessage(i18n.t("toasts.user.delete"));
      break;
    case "changeStatus":
      successMessage(i18n.t("toasts.user.update"));
      break;
    case "deleteKO":
      errorMessage(i18n.t("toasts.user.deleteKO"));
      break;
    case "error":
      errorMessage(i18n.t("toasts.user.error"));
      break;
    case "badRecovery":
      errorMessage(i18n.t("toasts.user.badRecovery"));
      break;
    case "user":
      errorMessage(i18n.t("toasts.user.badUser"));
      break;
    case "password":
      errorMessage(i18n.t("toasts.user.badPassword"));
      break;
    case "11000":
      errorMessage(i18n.t("toasts.user.11000"));
      break;
    case "serverError":
      errorMessage(i18n.t("toasts.user.serverError"));
      break;
    default:
      break;
  }
};

export const displayNationInfoByType = (type: string) => {
  switch (type) {
    case "new":
      successMessage(i18n.t("toasts.nation.create"));
      break;
    case "delete":
      successMessage(i18n.t("toasts.nation.delete"));
      break;
    default:
      break;
  }
};

export const displayRelationInfoByType = (type: string) => {
  switch (type) {
    case "new":
      successMessage(i18n.t("toasts.relation.create"));
      break;
    case "update":
      successMessage(i18n.t("toasts.relation.update"));
      break;
    case "serverError":
      errorMessage(i18n.t("toasts.errors.serverError"));
      break;
    case "400":
      errorMessage(i18n.t("toasts.errors.400"));
      break;
    default:
      break;
  }
};

export const displayTileInfoByType = (type: string) => {
  switch (type) {
    case "new":
      successMessage(i18n.t("toasts.tile.new"));
      break;
    case "update":
      successMessage(i18n.t("toasts.tile.update"));
      break;
    case "delete":
      successMessage(i18n.t("toasts.tile.delete"));
      break;
    case "forbidden":
      errorMessage(i18n.t("toasts.tile.forbidden"));
      break;
    case "serverError":
      errorMessage(i18n.t("toasts.errors.sererError"));
      break;
    default:
      break;
  }
};

export const displayPlaceInfoByType = (type: string) => {
  switch (type) {
    case "new":
      successMessage(i18n.t("toasts.place.new"));
      break;
    case "update":
      successMessage(i18n.t("toasts.place.update"));
      break;
    case "delete":
      successMessage(i18n.t("toasts.place.delete"));
      break;
    case "serverError":
      errorMessage(i18n.t("toasts.errors.sererError"));
      break;
    default:
      break;
  }
};
