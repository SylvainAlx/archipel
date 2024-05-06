import {
  IoMdLogIn,
  IoMdAddCircleOutline,
  IoMdSettings,
  IoMdLogOut,
  IoMdGlobe,
} from "react-icons/io";
import { GiBlackFlag } from "react-icons/gi";
import { userAtom } from "../settings/store";
import { useAtom } from "jotai";
import { MouseEventHandler } from "react";

export interface IconLinkProps {
  destination: string;
  text: string;
  action?: MouseEventHandler<HTMLDivElement>;
}

export default function IconLink({ destination, text, action }: IconLinkProps) {
  const [user] = useAtom(userAtom);

  return (
    <div
      className="flex flex-col items-center text-5xl md:text-3xl hover:text-secondary transition-all cursor-pointer"
      onClick={action}
    >
      {destination === "nations" && <IoMdGlobe />}
      {destination === "login" && <IoMdLogIn />}
      {destination === "register" && <IoMdAddCircleOutline />}
      {destination === "user" &&
        (user.avatar ? (
          <div className="rounded-full w-[45px] h-[45px] md:w-[28px] md:h-[28px] overflow-hidden">
            <img src={user.avatar} className={`w-full h-full`} />
          </div>
        ) : (
          <GiBlackFlag />
        ))}
      {destination === "admin" && <IoMdSettings />}
      {destination === "logout" && <IoMdLogOut />}
      <h2 className="hidden md:block text-[10px]">{text}</h2>
    </div>
  );
}
