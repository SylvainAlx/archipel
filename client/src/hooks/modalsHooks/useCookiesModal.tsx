import { useEffect, useState } from "react";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "../../settings/consts";
import ReactGA from "react-ga4";
import { showCookiesModalAtom } from "../../settings/store";
import { useAtom } from "jotai";

export function useCookiesModal() {
  const [showCookiesModal, setShowCookiesModal] = useAtom(showCookiesModalAtom);
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith("CookieConsent"));

  if (!cookie) {
    setShowCookiesModal(true);
  }

  const getCookieBoolean = () => {
    if (!cookie) return false; // Retourne false si le cookie n'existe pas
    return cookie.split("=")[1] === "true"; // Convertit la valeur en booléen
  };

  const [cookiesAccepted, setCookiesAccepted] =
    useState<boolean>(getCookieBoolean());

  const deleteGoogleAnalyticsCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      if (
        name.startsWith("_ga") ||
        name.startsWith("_gid") ||
        name.startsWith("_gat")
      ) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname}`;
      }
    });
  };

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
    ReactGA.send("pageview");
    setShowCookiesModal(false);
  };

  const handleDeclineCookies = () => {
    setCookiesAccepted(false);
    deleteGoogleAnalyticsCookies();
    setShowCookiesModal(false);
  };

  useEffect(() => {
    if (cookiesAccepted) {
      ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
    } else {
      deleteGoogleAnalyticsCookies();
    }
  }, [cookiesAccepted]);

  return {
    handleAcceptCookies,
    handleDeclineCookies,
    showCookiesModal,
  };
}
