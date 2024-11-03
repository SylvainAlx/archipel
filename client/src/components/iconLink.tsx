import {
  IoMdLogIn,
  IoMdAddCircleOutline,
  IoMdGlobe,
  IoMdHome,
} from "react-icons/io";
import { sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import { MouseEventHandler, useEffect, useState } from "react";
import Flag from "./flag";
import Avatar from "./avatar";
import { useLocation } from "react-router-dom";

export interface IconLinkProps {
  destination: string;
  text: string;
  action?: MouseEventHandler<HTMLDivElement>;
}

export default function IconLink({ destination, text, action }: IconLinkProps) {
  const [session] = useAtom(sessionAtom);
  const [focus, setFocus] = useState(false);
  const location = useLocation();
  const currentURL = location.pathname;

  useEffect(() => {
    setFocus(false);
    switch (destination) {
      case "home":
        currentURL === "/" && setFocus(true);
        break;
      case "login":
        if (currentURL === "/login" || currentURL === "/recovery") {
          setFocus(true);
        }
        break;
      case "register":
        currentURL === "/register" && setFocus(true);
        break;
      case "explore":
        currentURL.includes("explore") && setFocus(true);
        break;
      case "user":
        currentURL.includes("citizen") && setFocus(true);
        break;
      case "nation":
        currentURL.includes("nation") && setFocus(true);
        break;

      default:
        break;
    }
  }, [currentURL, destination]);

  return (
    <div
      className={`flex flex-col items-center text-5xl md:text-3xl hover:text-secondary transition-all cursor-pointer ${focus && "text-secondary"}`}
      onClick={action}
    >
      {destination === "home" && <IoMdHome />}
      {destination === "explore" && <IoMdGlobe />}
      {destination === "login" && <IoMdLogIn />}
      {destination === "register" && <IoMdAddCircleOutline />}
      {destination === "user" && session.user.avatar && (
        <Avatar isUser={true} url={session.user.avatar} isHeader={true} />
      )}
      {destination === "nation" && session.nation.data.url.flag != "" && (
        <Flag nation={session.nation} isHeader={true} />
      )}
      <h2 className="hidden md:block text-[10px]">
        {text.toLocaleUpperCase()}
      </h2>
    </div>
  );
}
