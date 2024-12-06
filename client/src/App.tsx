import { Routes, Route, useNavigate } from "react-router-dom";
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
import { lobbyAtom, nationFetchedAtom, sessionAtom } from "./settings/store";
import { useEffect, useState } from "react";
import ModalsRouter from "./router/modalsRouter";
import { ArchipelRoute } from "./types/typReact";
import i18n from "./i18n/i18n";
import { authentification } from "./api/user/userAPI";
import { MDP_LOBBY } from "./settings/consts";
import Lobby from "./pages/lobby";
import ReactGA from "react-ga4";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "./settings/consts.ts";
import CookiesModal from "./components/modals/cookiesModal.tsx";

export default function App() {
  const [access, setAccess] = useAtom(lobbyAtom);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [openPrivateRoads, setOpenPrivateRoads] = useState(false);
  const [session, setSession] = useAtom(sessionAtom);
  const [nation] = useAtom(nationFetchedAtom);

  const navigate = useNavigate();

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
    ReactGA.send("pageview");
  };

  const handleDeclineCookies = () => {
    setCookiesAccepted(false);
  };

  useEffect(() => {
    if (cookiesAccepted) {
      ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
    }
  }, [cookiesAccepted]);

  useEffect(() => {
    i18n.init();
    const lobbyToken = localStorage.getItem("lobbyToken");
    if (!access && lobbyToken === MDP_LOBBY) {
      setAccess(true);
      session.user.officialId === "" && authentification();
    } else {
      setAccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session.user.officialId != "") {
      if (
        session.user.citizenship.nationId != "" &&
        nation.officialId != session.user.citizenship.nationId
      ) {
        navigate(`/citizen/${session.user.officialId}`);
      }
      setOpenPrivateRoads(true);
    } else {
      navigate(`/`);
      setOpenPrivateRoads(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.user]);

  useEffect(() => {
    if (
      nation != null &&
      nation.officialId === session.user.citizenship.nationId
    ) {
      setSession({ ...session, nation });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nation]);

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
        {access && (
          <CookiesModal
            accept={handleAcceptCookies}
            decline={handleDeclineCookies}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
