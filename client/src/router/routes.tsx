/* eslint-disable @typescript-eslint/no-explicit-any */
import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/register";
import { ArchipelRoute } from "../types/global";

export const publicRoutes: ArchipelRoute[] = [
  { path: "/", page: <Home /> },
  { path: "/login", page: <Login /> },
  { path: "/register", page: <Register /> },
];
