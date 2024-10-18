import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";

export default function CookiesModal() {
  const { t } = useTranslation();
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText={t("components.modals.cookiesModal.accept")}
        declineButtonText={t("components.modals.cookiesModal.decline")}
        enableDeclineButton
        // onAccept={() => {
        //   console.log("Cookies acceptés");
        // }}
        // onDecline={() => {
        //   console.log("Cookies refusés");
        // }}
        style={{ background: "rgb(0, 99, 138)" }}
        buttonStyle={{ background: "#4CAF50", color: "#ffffff" }}
      >
        {t("components.modals.cookiesModal.text")}
      </CookieConsent>
    </div>
  );
}
