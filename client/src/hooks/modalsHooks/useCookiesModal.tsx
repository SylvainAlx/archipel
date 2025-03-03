import { useEffect, useState } from "react";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "../../settings/consts";
import ReactGA from "react-ga4";
import { myStore, showCookiesModalAtom } from "../../settings/store";
import { Cookies } from "react-cookie-consent";

export function useCookiesModal() {
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

  return {
    handleAcceptCookies,
    handleDeclineCookies,
  };
}
