import {
  IoMdLogIn,
  IoMdAddCircleOutline,
  IoMdGlobe,
  IoMdHome,
} from "react-icons/io";
import { sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import { MouseEventHandler } from "react";
import Flag from "./flag";
import Avatar from "./avatar";

export interface IconLinkProps {
  destination: string;
  text: string;
  action?: MouseEventHandler<HTMLDivElement>;
}

export default function IconLink({ destination, text, action }: IconLinkProps) {
  const [session] = useAtom(sessionAtom);

  return (
    <div
      className="flex flex-col items-center text-5xl md:text-3xl hover:text-secondary transition-all cursor-pointer"
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
