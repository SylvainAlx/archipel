import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { lobbyAtom, sessionAtom } from "../settings/store";
import { useLocation, useNavigate } from "react-router-dom";
import { MDP_LOBBY } from "../settings/consts";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { errorMessage, successMessage } from "../utils/toasts";
import { useTranslation } from "react-i18next";

export const useAuth = () => {
  const [access, setAccess] = useAtom(lobbyAtom);
  const [session] = useAtom(sessionAtom);
  const [openPrivateRoads, setOpenPrivateRoads] = useState(false);
  const [offline, setOffline] = useState(false);
  const isOnlineHook = useOnlineStatus();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authenticateUser = async () => {
      await session.user.authentification();
    };

    const lobbyToken = localStorage.getItem("lobbyToken");
    if (!access && lobbyToken === MDP_LOBBY) {
      setAccess(true);
      if (!session.user.officialId) authenticateUser();
    } else {
      setAccess(false);
    }
  }, []);

  useEffect(() => {
    if (session.user.officialId) {
      setOpenPrivateRoads(true);
      if (["/login", "/register"].includes(location.pathname)) {
        navigate(`/citizen/${session.user.officialId}`);
      }
    } else {
      setOpenPrivateRoads(false);
    }
  }, [session.user]);

  useEffect(() => {
    if (!isOnlineHook) {
      errorMessage(t("toasts.errors.offline"));
      setOffline(true);
    } else {
      if (offline) {
        successMessage(t("toasts.connected"));
        setOffline(false);
      }
    }
  }, [isOnlineHook]);

  return { user: session.user, access, openPrivateRoads };
};
