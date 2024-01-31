import { useNavigate } from "react-router-dom";
import {
  IoMdLogIn,
  IoMdAddCircleOutline,
  IoMdSettings,
  IoMdLogOut,
  IoMdGlobe,
} from "react-icons/io";
import { GiBlackFlag } from "react-icons/gi";
import { confirmBox, nationAtom, selectedNationAtom } from "../settings/store";
import { useAtom } from "jotai";
import { ButtonProps } from "../types/typProp";

export default function IconLink({ path, text }: ButtonProps) {
  const [, setConfirm] = useAtom(confirmBox);
  const [, setSelectedNation] = useAtom(selectedNationAtom);
  const [nation] = useAtom(nationAtom);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path === "/logout") {
      setConfirm({
        action: "logout",
        text: "Souhaitez-vous vous déconnecter ?",
        result: "",
      });
    } else if (path === "/dashboard") {
      setSelectedNation(nation);
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 items-center text-5xl hover:text-secondary transition-all cursor-pointer"
      onClick={handleClick}
    >
      {path === "/nations" && <IoMdGlobe />}
      {path === "/login" && <IoMdLogIn />}
      {path === "/register" && <IoMdAddCircleOutline />}
      {path === "/dashboard" &&
        (nation.data.url.flagUrl ? (
          <div className="rounded-full w-[45px] h-[45px] overflow-hidden">
            <img
              src={nation.data.url.flagUrl}
              className={`w-full h-full ${nation.data.url.flagUrl === "/logo.png" && "opacity-20"}`}
            />
          </div>
        ) : (
          <GiBlackFlag />
        ))}
      {path === "/admin" && <IoMdSettings />}
      {path === "/logout" && <IoMdLogOut />}
      <h2 className="text-[10px]">{text}</h2>
    </div>
  );
}
