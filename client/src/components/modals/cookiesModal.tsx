import { useEffect, useState } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "../../settings/consts";
import ReactGA from "react-ga4";
import { myStore, showCookiesModalAtom } from "../../settings/store";

export default function CookiesModal() {
  const { t } = useTranslation();

  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
    ReactGA.send("pageview");
    myStore.set(showCookiesModalAtom, false);
  };

  const handleDeclineCookies = () => {
    setCookiesAccepted(false);
    myStore.set(showCookiesModalAtom, false);
  };

  useEffect(() => {
    if (cookiesAccepted) {
      ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
    } else {
      ReactGA.reset();
      const analyticsCookies = ["_ga", "_gid", "_gat", "_ga_9HVPR7J8XE"];

      analyticsCookies.forEach((cookie) => Cookies.remove(cookie));
    }
  }, [cookiesAccepted]);

  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText={t("components.modals.cookiesModal.accept")}
        declineButtonText={t("components.modals.cookiesModal.decline")}
        enableDeclineButton
        onAccept={handleAcceptCookies}
        onDecline={handleDeclineCookies}
        style={{ background: "rgb(0, 99, 138)" }}
        buttonStyle={{ background: "#4CAF50", color: "#ffffff" }}
      >
        {t("components.modals.cookiesModal.text")}
      </CookieConsent>
    </div>
  );
}
