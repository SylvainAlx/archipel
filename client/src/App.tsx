/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  adminRoutes,
  authRoutes,
  privateRoutes,
  publicRoutes,
} from "./router/routes";

import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./App.css";
import { useAtom } from "jotai";
import { sessionAtom } from "./settings/store";
import { useEffect, useState } from "react";
import ModalsRouter from "./router/modalsRouter";
import { ArchipelRoute } from "./types/typReact";
import i18n from "./i18n/i18n";
import { authentification } from "./api/user/userAPI";
import { getNation } from "./api/nation/nationAPI";

export default function App() {
  // const [user] = useAtom(userAtom);
  // const [isLogged] = useAtom(isLoggedAtom);
  const [session] = useAtom(sessionAtom);
  const [openPrivateRoads, setOpenPrivateRoads] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    i18n.init();
    authentification();
  }, []);

  useEffect(() => {
    if (session.user.officialId != "") {
      if (session.user.citizenship.nationId != "") {
        getNation(
          session.user.citizenship.nationId,
          session.user.citizenship.nationOwner,
        );
      }
      navigate(`/citizen/${session.user.officialId}`);
      setOpenPrivateRoads(true);
    } else {
      setOpenPrivateRoads(false);
    }
  }, [session]);

  // useEffect(() => {
  //   if (isLogged != "") {
  //     navigate(`/citizen/${user.officialId}`);
  //     setOpenPrivateRoads(true);
  //   } else {
  //     setOpenPrivateRoads(false);
  //   }
  // }, [isLogged]);

  return (
    <>
      <Header />

      <main className="animate-fadeIn flex flex-grow flex-col items-center gap-2 self-center pt-10 pb-[100px] sm:pt-20 px-1 md:px-4 w-full min-w-[300px] max-w-[1280px]">
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
        <ModalsRouter />
      </main>
      <Footer />
    </>
  );
}
