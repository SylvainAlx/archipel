/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { authRoutes, privateRoutes, publicRoutes } from "./router/routes";
import { ArchipelRoute } from "./utils/types";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./App.css";
import { useAtom } from "jotai";
import { nationAtom } from "./utils/store";
import { useEffect } from "react";
import { authGet } from "./utils/fetch";
import { GET_JWT } from "./utils/functions";
import ModalsRouter from "./router/modalsRouter";

export default function App() {
  const [nation, setNation] = useAtom(nationAtom);

  useEffect(() => {
    const jwt = GET_JWT();
    if (jwt) {
      authGet(jwt)
        .then((data) => {
          if (data.name != "") {
            setNation({
              name: data.name,
              data: data.data,
            });
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((error) => alert(error.message));
    }
  }, []);

  useEffect(() => {
    console.log(nation);
  }, [nation]);

  return (
    <BrowserRouter>
      <Header />
      <main className="flex flex-col flex-grow justify-center items-center gap-4">
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
