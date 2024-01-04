/* eslint-disable @typescript-eslint/no-explicit-any */
import Admin from "../pages/admin";
import Contact from "../pages/contact";
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
  { path: "/dashboard", page: <Dashboard /> },
  { path: "/contact", page: <Contact /> },
];

export const privateRoutes: ArchipelRoute[] = [];
export const adminRoutes: ArchipelRoute[] = [
  { path: "/admin", page: <Admin /> },
];
