/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes } from "./router/routes";
import { ArchipelRoute } from "./utils/types";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./App.css"

export default function App() {
  return (
          <BrowserRouter>
            <Header />
            <main className="flex flex-col flex-grow justify-center items-center gap-4">
              <Routes>
                {publicRoutes.map((route: ArchipelRoute, i: number) => (
                  <Route path={route.path} element={route.page} key={i} />
                ))}
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
  );
}
