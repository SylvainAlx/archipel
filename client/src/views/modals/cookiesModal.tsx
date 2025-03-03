import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import { myStore, showCookiesModalAtom } from "../../settings/store";
import { useModal } from "../../hooks/useModal";
import { useCookiesModal } from "../../hooks/modalsHooks/useCookiesModal";

export default function CookiesModal() {
  const { t } = useTranslation();
  const modalRef = useModal(() => myStore.set(showCookiesModalAtom, false));
  const { handleAcceptCookies, handleDeclineCookies } = useCookiesModal();

  return (
    <div ref={modalRef} tabIndex={-1}>
      <CookieConsent
        location="bottom"
        buttonText={t("components.modals.cookiesModal.accept")}
        declineButtonText={t("components.modals.cookiesModal.decline")}
        enableDeclineButton
        onAccept={handleAcceptCookies}
        onDecline={handleDeclineCookies}
        style={{ background: "var(--color-complementary2)" }}
        buttonStyle={{
          background: "var(--color-secondary)",
          color: "var(--color-light)",
          borderRadius: 100,
          padding: "5px 20px",
        }}
        declineButtonStyle={{
          background: "var(--color-danger)",
          color: "var(--color-light)",
          borderRadius: 100,
          padding: "5px 20px",
        }}
      >
        {t("components.modals.cookiesModal.text")}
      </CookieConsent>
    </div>
  );
}
