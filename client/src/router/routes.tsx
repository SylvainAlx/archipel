/* eslint-disable @typescript-eslint/no-explicit-any */
import Admin from "../pages/admin";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Login from "../pages/login";
import Nations from "../pages/nations";
import Recovery from "../pages/recovery";
import Register from "../pages/register";
import { ArchipelRoute } from "../types/typReact";

export const authRoutes: ArchipelRoute[] = [
  { path: "/login", page: <Login /> },
  { path: "/register", page: <Register /> },
];

export const publicRoutes: ArchipelRoute[] = [
  { path: "/", page: <Home /> },
  { path: "/recovery", page: <Recovery /> },
  { path: "/nations", page: <Nations /> },
];

export const privateRoutes: ArchipelRoute[] = [
  { path: "/dashboard", page: <Dashboard /> },
];
export const adminRoutes: ArchipelRoute[] = [
  { path: "/admin", page: <Admin /> },
];
