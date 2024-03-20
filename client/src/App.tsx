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
import {
  myStore,
  nationAtom,
  ownerAtom,
  selectedNationAtom,
} from "./settings/store";
import { useEffect } from "react";
import ModalsRouter from "./router/modalsRouter";
import { ArchipelRoute } from "./types/typReact";
import { authentification } from "./api/authentification/authAPI";
import i18n from "./i18n/i18n";

export default function App() {
  const [nation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);

  const navigate = useNavigate();

  useEffect(() => {
    i18n.init();
    authentification();
  }, []);

  useEffect(() => {
    if (nation.name != "") {
      myStore.set(selectedNationAtom, { ...nation });
      navigate(`/dashboard/${nation._id}`);
    } else {
      navigate("/");
    }
  }, [nation]);

  useEffect(() => {
    if (nation._id === selectedNation._id && nation._id != "") {
      myStore.set(ownerAtom, true);
    } else {
      myStore.set(ownerAtom, false);
    }
  }, [selectedNation]);

  return (
    <>
      <Header />

      <main className="animate-fadeIn flex flex-grow flex-col items-center gap-2 self-center pt-10 pb-[100px] sm:pt-20 px-1 md:px-4 w-full min-w-[300px] max-w-[1280px]">
        <Routes>
          {publicRoutes.map((route: ArchipelRoute, i: number) => (
            <Route path={route.path} element={route.page} key={i} />
          ))}
          {nation.name != ""
            ? privateRoutes.map((route: ArchipelRoute, i: number) => (
                <Route path={route.path} element={route.page} key={i} />
              ))
            : authRoutes.map((route: ArchipelRoute, i: number) => (
                <Route path={route.path} element={route.page} key={i} />
              ))}
          {nation.role === "admin" &&
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
