import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";
import { useCookiesModal } from "../../hooks/modalsHooks/useCookiesModal";
import { Link } from "react-router-dom";

export default function CookiesModal() {
  const { t } = useTranslation();
  const modalRef = useModal(() => {});
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
          background: "var(--color-wait)",
          color: "var(--color-light)",
          borderRadius: 100,
          padding: "5px 20px",
        }}
      >
        <div className="flex flex-col gap-2">
          {t("components.modals.cookiesModal.text")}
          <strong>
            <Link
              className="transition-colors cursor-pointer hover:text-secondary"
              to="/termsofservice"
            >
              {t("pages.termsOfService.title")}
            </Link>
          </strong>
        </div>
      </CookieConsent>
    </div>
  );
}
