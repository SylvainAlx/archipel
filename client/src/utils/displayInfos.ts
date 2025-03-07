import i18n from "../i18n/i18n";
import { errorMessage } from "./toasts";

export const errorCatching = (error: unknown) => {
  try {
    if (error instanceof Error) {
      const parsedMessage = JSON.parse(error.message);
      if (parsedMessage?.infoType) {
        switch (parsedMessage.infoType) {
          case "400":
            errorMessage(i18n.t("toasts.errors.400"));
            break;
          case "401":
            errorMessage(i18n.t("toasts.errors.401"));
            break;
          case "403":
            errorMessage(i18n.t("toasts.errors.403"));
            break;
          case "404":
            errorMessage(i18n.t("toasts.errors.404"));
            break;
          case "11000":
            errorMessage(i18n.t("toasts.errors.11000"));
            break;
          case "oldJwt":
            errorMessage(i18n.t("toasts.errors.oldJwt"));
            break;
          case "badUser":
            errorMessage(i18n.t("toasts.errors.badUser"));
            break;
          case "badPassword":
            errorMessage(i18n.t("toasts.errors.badPassword"));
            break;
          case "badRecovery":
            errorMessage(i18n.t("toasts.errors.badRecovery"));
            break;
          case "ipbanned":
            errorMessage(i18n.t("toasts.errors.ipbanned"));
            break;
          case "subscriptionNotReady":
            errorMessage(i18n.t("toasts.errors.subscriptionNotReady"));
            break;
          case "creditsNotReady":
            errorMessage(i18n.t("toasts.errors.creditsNotReady"));
            break;
          case "notEnoughCredits":
            errorMessage(i18n.t("toasts.errors.notEnoughCredits"));
            break;
          default:
            errorMessage(i18n.t("toasts.errors.500"));
            break;
        }
        return;
      }
    }
    console.error(error);
  } catch (e) {
    errorMessage(i18n.t("toasts.errors.400"));
    console.error("Erreur lors de la gestion de l'erreur :", e, error);
  }
};
