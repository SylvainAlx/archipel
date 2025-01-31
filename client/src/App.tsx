import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  adminRoutes,
  authRoutes,
  privateRoutes,
  publicRoutes,
} from "./router/routes";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./assets/styles/App.css";
import { useAtom } from "jotai";
import { lobbyAtom, sessionAtom, showCookiesModalAtom } from "./settings/store";
import { useEffect, useState } from "react";
import ModalsRouter from "./router/modalsRouter";
import { ArchipelRoute } from "./types/typReact";
import i18n from "./i18n/i18n";
import { MDP_LOBBY, SERVER_URL } from "./settings/consts";
import Lobby from "./pages/lobby";
import CookiesModal from "./components/modals/cookiesModal.tsx";
import { clearImagesInCache } from "./utils/procedures.ts";
import useOnlineStatus from "./hooks/useOnlineStatus.tsx";
import { errorMessage, successMessage } from "./utils/toasts.ts";
import { useTranslation } from "react-i18next";
import useDebugAtom from "./hooks/useDebugAtom.tsx";

export default function App() {
  const [access, setAccess] = useAtom(lobbyAtom);
  const [openPrivateRoads, setOpenPrivateRoads] = useState(false);
  const [session] = useAtom(sessionAtom);
  const [showModal] = useAtom(showCookiesModalAtom);
  const isOnlineHook = useOnlineStatus();
  const [offline, setOffline] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  SERVER_URL.includes("localhost") && useDebugAtom();

  useEffect(() => {
    const auth = async () => {
      await session.user.authentification();
    };
    clearImagesInCache();
    i18n.init();
    const lobbyToken = localStorage.getItem("lobbyToken");
    if (!access && lobbyToken === MDP_LOBBY) {
      setAccess(true);
      session.user.officialId === "" && auth();
    } else {
      setAccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session.user.officialId != "") {
      setOpenPrivateRoads(true);
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate(`/citizen/${session.user.officialId}`);
      }
    } else {
      setOpenPrivateRoads(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      <Header />
      <main className="animate-fadeIn flex flex-grow flex-col items-center gap-2 self-center pt-10 pb-[100px] sm:pt-20 px-1 md:px-4 w-full min-w-[300px] max-w-[1440px]">
        {access ? (
          <Routes>
            {publicRoutes.map((route: ArchipelRoute, i: number) => (
              <Route path={route.path} element={route.page} key={i} />
            ))}
            {openPrivateRoads
              ? privateRoutes.map((route: ArchipelRoute, i: number) => (
                  <Route path={route.path} element={route.page} key={i} />
                ))
              : authRoutes.map((route: ArchipelRoute, i: number) => (
                  <Route path={route.path} element={route.page} key={i} />
                ))}
            {session.user.role === "admin" &&
              adminRoutes.map((route: ArchipelRoute, i: number) => (
                <Route path={route.path} element={route.page} key={i} />
              ))}
          </Routes>
        ) : (
          <Lobby />
        )}
        <ModalsRouter />
        {access && showModal && <CookiesModal />}
      </main>
      <Footer />
    </>
  );
}
