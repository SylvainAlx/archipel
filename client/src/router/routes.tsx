/* eslint-disable @typescript-eslint/no-explicit-any */
import Admin from "../pages/admin";
import Nation from "../pages/nation";
import Home from "../pages/home";
import LegalNotice from "../pages/legalNotice";
import Login from "../pages/login";
import Explore from "../pages/explore";
import Place from "../pages/place";
import Recovery from "../pages/recovery";
import Register from "../pages/register";
import TermsOfService from "../pages/termsOfService";
import { ArchipelRoute } from "../types/typReact";
import Citizen from "../pages/citizen";
import ReleaseNotes from "../pages/releaseNotes";

export const authRoutes: ArchipelRoute[] = [
  { path: "/login", page: <Login /> },
  { path: "/register", page: <Register /> },
];

export const publicRoutes: ArchipelRoute[] = [
  { path: "/", page: <Home /> },
  { path: "/recovery", page: <Recovery /> },
  { path: "/citizen/:id", page: <Citizen /> },
  { path: "/explore", page: <Explore /> },
  { path: "/nation/:id", page: <Nation /> },
  { path: "/place/:id", page: <Place /> },
  { path: "/legalnotice", page: <LegalNotice /> },
  { path: "/termsofservice", page: <TermsOfService /> },
  { path: "/releasenotes", page: <ReleaseNotes /> },
];

export const privateRoutes: ArchipelRoute[] = [];
export const adminRoutes: ArchipelRoute[] = [
  { path: "/admin", page: <Admin /> },
];
