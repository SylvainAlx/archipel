/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./router/routes";
import { ArchipelRoute } from "./utils/types";
import { BrowserRouter } from "react-router-dom";
import Header from "./layouts/header";
import Footer from "./layouts/footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {publicRoutes.map((route: ArchipelRoute, i: number) => (
          <Route path={route.path} element={route.page} key={i} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
