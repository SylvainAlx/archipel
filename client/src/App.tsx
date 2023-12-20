/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { authRoutes, privateRoutes, publicRoutes } from "./router/routes";

import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./App.css";
import { useAtom } from "jotai";
import { EmptyNation, loadingSpinner, nationAtom } from "./utils/store";
import { useEffect } from "react";
import { authGet } from "./utils/fetch";
import { GET_JWT } from "./utils/functions";
import ModalsRouter from "./router/modalsRouter";
import { ArchipelRoute } from "./types/typReact";

export default function App() {
  const [nation, setNation] = useAtom(nationAtom);
  const [, setLoading] = useAtom(loadingSpinner);

  useEffect(() => {
    const jwt = GET_JWT();
    if (jwt) {
      setLoading({show: true, text:"Connexion au serveur"})
      authGet(jwt)
        .then((data) => {
          setLoading({show: false, text:"Connexion au serveur"});
          if (data.name != undefined) {
            setNation({
              name: data.name,
              role: data.role,
              data: data.data,
            });
          } else {
            setNation(EmptyNation);
            localStorage.removeItem("jwt");
          }
        })
        .catch((error) => alert(error.message));
    } else {
      setNation(EmptyNation);
    }
  }, []);

  useEffect(() => {
    console.log(nation);
  }, [nation]);

  return (
    <BrowserRouter>
      <Header />
      <main className="animate-in fade-in duration-300 flex flex-grow flex-col items-center gap-2 self-center pt-10 pb-[100px] sm:pt-20 px-4 w-full max-w-[1280px]">
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
        </Routes>
        <ModalsRouter />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
