import {
  IoMdLogIn,
  IoMdAddCircleOutline,
  IoMdSettings,
  IoMdGlobe,
} from "react-icons/io";
// import { GiBlackFlag } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import { MouseEventHandler } from "react";
import { GiBlackFlag } from "react-icons/gi";

export interface IconLinkProps {
  destination: string;
  text: string;
  action?: MouseEventHandler<HTMLDivElement>;
}

export default function IconLink({ destination, text, action }: IconLinkProps) {
  // const [user] = useAtom(userAtom);
  // const [nation] = useAtom(nationAtom);
  const [session] = useAtom(sessionAtom);

  return (
    <div
      className="flex flex-col items-center text-5xl md:text-3xl hover:text-secondary transition-all cursor-pointer"
      onClick={action}
    >
      {destination === "nations" && <IoMdGlobe />}
      {destination === "login" && <IoMdLogIn />}
      {destination === "register" && <IoMdAddCircleOutline />}
      {destination === "user" &&
        (session.user.avatar ? (
          <div className="rounded-full w-[45px] h-[45px] md:w-[28px] md:h-[28px] overflow-hidden">
            <img src={session.user.avatar} className={`w-full h-full`} />
          </div>
        ) : (
          <RxAvatar />
        ))}
      {destination === "nation" &&
        session.nation &&
        (session.nation.data.url.flag != "" ? (
          <div className="rounded-full w-[45px] h-[45px] md:w-[28px] md:h-[28px] overflow-hidden">
            <img
              src={session.nation.data.url.flag}
              className={`w-full h-full`}
            />
          </div>
        ) : (
          <GiBlackFlag />
        ))}
      {destination === "admin" && <IoMdSettings />}
      <h2 className="hidden md:block text-[10px]">{text}</h2>
    </div>
  );
}
