/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from "react-router-dom";
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
  loadingSpinner,
  nationAtom,
  selectedNationAtom,
} from "./settings/store";
import { useEffect } from "react";
import { authGet } from "./utils/fetch";
import { GET_JWT } from "./utils/functions";
import ModalsRouter from "./router/modalsRouter";
import { ArchipelRoute } from "./types/typReact";
import { EmptyNation } from "./types/typNation";
import { SERVEUR_LOADING_STRING } from "./settings/consts";

export default function App() {
  const [nation, setNation] = useAtom(nationAtom);
  const [, setSelectedNation] = useAtom(selectedNationAtom);
  const [, setLoading] = useAtom(loadingSpinner);

  useEffect(() => {
    const jwt = GET_JWT();
    if (jwt) {
      setLoading({ show: true, text: SERVEUR_LOADING_STRING });
      authGet(jwt)
        .then((data) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          if (data.name != undefined) {
            setNation({
              _id: data._id,
              name: data.name,
              role: data.role,
              data: data.data,
              createdAt: data.createdAt,
            });
          } else {
            setNation(EmptyNation);
            setLoading({ show: false, text: SERVEUR_LOADING_STRING });
            localStorage.removeItem("jwt");
          }
        })
        .catch((error) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          console.log(error);
        });
    } else {
      setNation(EmptyNation);
    }
  }, []);

  useEffect(() => {
    if (nation.name != "") {
      setSelectedNation({ ...nation });
    }
  }, [nation]);

  return (
    <>
      <Header />
      <main className="animate-fadeIn flex flex-grow flex-col items-center gap-2 self-center pt-10 pb-[100px] sm:pt-20 px-2 md:px-4 w-full min-w-[300px] max-w-[1280px]">
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
