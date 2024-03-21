/* eslint-disable @typescript-eslint/no-explicit-any */
import Admin from "../pages/admin";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import LegalNotice from "../pages/legalNotice";
import Login from "../pages/login";
import Nations from "../pages/nations";
import Recovery from "../pages/recovery";
import Register from "../pages/register";
import TermsOfService from "../pages/termsOfService";
import { ArchipelRoute } from "../types/typReact";

export const authRoutes: ArchipelRoute[] = [
  { path: "/login", page: <Login /> },
  { path: "/register", page: <Register /> },
];

export const publicRoutes: ArchipelRoute[] = [
  { path: "/", page: <Home /> },
  { path: "/recovery", page: <Recovery /> },
  { path: "/nations", page: <Nations /> },
  { path: "/dashboard/:id", page: <Dashboard /> },
  { path: "/legalnotice", page: <LegalNotice /> },
  { path: "/termsofservice", page: <TermsOfService /> },
];

export const privateRoutes: ArchipelRoute[] = [];
export const adminRoutes: ArchipelRoute[] = [
  { path: "/admin", page: <Admin /> },
];
