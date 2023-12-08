/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router/routes";
import { ArchipelRoute } from "./utils/types";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./App.css";
import { useAtom } from 'jotai';
import { nationAtom } from "./utils/store";
import { useEffect } from "react";
import { authGet } from "./utils/fetch";

export default function App() {

  const [nation, setNation] = useAtom(nationAtom);

  useEffect(() =>{
    const jwt = localStorage.getItem("jwt");
    if (jwt){
      authGet(jwt)
      .then((data)=>{
        if (data.name != "") {
          setNation({
            name: data.name,
            data: data.data
        })
        } else {
          localStorage.removeItem("jwt");
        }
      })
      .catch((error) => alert(error.message));
    } 
  }, [])

  useEffect(()=>{
    console.log(nation);
    
  }, [nation])

  return (
          <BrowserRouter>
            <Header />
            <main className="flex flex-col flex-grow justify-center items-center gap-4">
              <Routes>
                  {privateRoutes.map((route: ArchipelRoute, i: number) => (
                    <Route path={route.path} element={route.page} key={i} />
                  ))}
                  {publicRoutes.map((route: ArchipelRoute, i: number) => (
                    <Route path={route.path} element={route.page} key={i} />
                  ))}
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
  );
}
