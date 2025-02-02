import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes, authRoutes, adminRoutes } from "./routes";

import Lobby from "../pages/lobby";
import ModalsRouter from "./modalsRouter";
import CookiesModal from "../components/modals/cookiesModal";
import { useAuth } from "../hooks/useAuth";

const Layout = () => (
  <main className="animate-fadeIn flex flex-grow flex-col items-center gap-2 self-center pt-10 pb-[100px] sm:pt-20 px-1 md:px-4 w-full min-w-[300px] max-w-[1440px]">
    <Outlet />
    <ModalsRouter />
  </main>
);

const AppRoutes = () => {
  const { user, access, openPrivateRoads } = useAuth();

  if (!access) return <Lobby />;

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {publicRoutes.map(({ path, page }, i) => (
            <Route key={i} path={path} element={page} />
          ))}
          {openPrivateRoads
            ? privateRoutes.map(({ path, page }, i) => (
                <Route key={i} path={path} element={page} />
              ))
            : authRoutes.map(({ path, page }, i) => (
                <Route key={i} path={path} element={page} />
              ))}
          {user?.role === "admin" &&
            adminRoutes.map(({ path, page }, i) => (
              <Route key={i} path={path} element={page} />
            ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>

      {access && <CookiesModal />}
    </>
  );
};

export default AppRoutes;
