/* eslint-disable @typescript-eslint/no-explicit-any */
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import { ArchipelRoute } from "../utils/types";

export const publicRoutes: ArchipelRoute[] = [
  { path: "/", page: <Home /> },
  { path: "/login", page: <Login /> },
  { path: "/register", page: <Register /> },
];
