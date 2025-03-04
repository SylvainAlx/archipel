import {
  IoMdLogIn,
  IoMdAddCircleOutline,
  IoMdGlobe,
  IoMdHome,
} from "react-icons/io";
import { comListAtomV2, sessionAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { MouseEventHandler, useEffect, useState } from "react";
import Avatar from "./avatar";
import { useLocation } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import { NationModel } from "../../models/nationModel";
import UnwatchedCountDot from "./unwatchedCountDot";
import { COM_TYPE } from "../../settings/consts";
import Flag from "./flag";

export interface IconLinkProps {
  nation?: NationModel;
  destination: string;
  text: string;
  action?: MouseEventHandler<HTMLButtonElement>;
}

export default function IconLink({
  nation,
  destination,
  text,
  action,
}: IconLinkProps) {
  const [session] = useAtom(sessionAtom);
  const [comList] = useAtom(comListAtomV2);
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
        currentURL === `/citizen/${session.user.officialId}` && setFocus(true);
        break;
      case "nation":
        currentURL.includes("nation") && setFocus(true);
        break;
      case "admin":
        currentURL === "/admin" && setFocus(true);
        break;
      default:
        break;
    }
  }, [currentURL, destination, session.user.officialId]);

  return (
    <button
      className={`flex flex-col items-center justify-center text-5xl md:text-3xl hover:text-secondary transition-all cursor-pointer ${focus && "text-secondary"}`}
      onClick={action}
    >
      {destination === "home" && <IoMdHome />}
      {destination === "explore" && <IoMdGlobe />}
      {destination === "login" && <IoMdLogIn />}
      {destination === "register" && <IoMdAddCircleOutline />}
      {destination === "user" && (
        <div className="relative">
          <UnwatchedCountDot
            count={comList.getUnreadCountByType(
              [COM_TYPE.userPrivate.id],
              session.user.officialId,
            )}
          />
          <Avatar isUser={true} url={session.user.avatar} isHeader={true} />
        </div>
      )}
      {destination === "nation" && nation && (
        <div className="relative">
          {nation.officialId === session.user.citizenship.nationId &&
            session.user.citizenship.nationOwner && (
              <UnwatchedCountDot
                count={comList.getUnreadCountByType(
                  [COM_TYPE.nationPublic.id, COM_TYPE.nationPrivate.id],
                  nation.officialId,
                )}
              />
            )}

          <Flag nation={nation} isHeader={true} />
        </div>
      )}
      {destination === "admin" && (
        <FaShieldAlt className="text-[40px] md:text-[25px]" />
      )}
      <h2 className="hidden md:block text-[10px]">
        {text.toLocaleUpperCase()}
      </h2>
    </button>
  );
}
