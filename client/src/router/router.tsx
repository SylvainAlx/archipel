import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Lobby from "../pages/lobby";
import ModalsRouter from "./modalsRouter";
import { useAuth } from "../hooks/useAuth";
import Home from "../pages/home";
import Recovery from "../pages/recovery";
import Citizen from "../pages/citizen";
import Explore from "../pages/explore";
import Nation from "../pages/nation";
import Place from "../pages/place";
import TermsOfService from "../pages/termsOfService";
import ReleaseNotes from "../pages/releaseNotes";
import Admin from "../pages/admin";
import Login from "../pages/login";
import Register from "../pages/register";

const Layout = () => (
  <main className="animate-fadeIn flex flex-grow flex-col items-center gap-2 self-center pt-5 pb-[100px] px-1 md:px-4 w-full min-w-[300px] max-w-[1440px]">
    <Outlet />
    <ModalsRouter />
  </main>
);

const Router = () => {
  const { user, access, isConnected } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        {access ? (
          <>
            <Route path="/" element={<Home />} />

            <Route path="citizen">
              <Route path=":id" element={<Citizen />} />
            </Route>
            <Route path="explore" element={<Explore />}>
              <Route path=":id" element={<Explore />} />
            </Route>
            <Route path="nation">
              <Route path=":id" element={<Nation />} />
            </Route>
            <Route path="place">
              <Route path=":id" element={<Place />} />
            </Route>
            {!isConnected && (
              <>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="recovery" element={<Recovery />} />
              </>
            )}
            {isConnected && user?.role === "admin" && (
              <Route path="admin" element={<Admin />} />
            )}
          </>
        ) : (
          <Route path="/" element={<Lobby />} />
        )}
        <Route path="termsofservice" element={<TermsOfService />} />
        <Route path="releasenotes" element={<ReleaseNotes />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default Router;
