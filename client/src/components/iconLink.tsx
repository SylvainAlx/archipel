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
    } else if (path === "/nation") {
      setSelectedNation(nation);
      navigate(`/nation/${nation.officialId}`);
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className="flex flex-col items-center text-5xl md:text-3xl hover:text-secondary transition-all cursor-pointer"
      onClick={handleClick}
    >
      {path === "/nations" && <IoMdGlobe />}
      {path === "/login" && <IoMdLogIn />}
      {path === "/register" && <IoMdAddCircleOutline />}
      {path === "/nation" &&
        (nation.data.url.flag ? (
          <div className="rounded-full w-[45px] h-[45px] md:w-[28px] md:h-[28px] overflow-hidden">
            <img
              src={nation.data.url.flag}
              className={`w-full h-full ${nation.data.url.flag === "/logoV2.webp" && "opacity-20"}`}
            />
          </div>
        ) : (
          <GiBlackFlag />
        ))}
      {path === "/admin" && <IoMdSettings />}
      {path === "/logout" && <IoMdLogOut />}
      <h2 className="hidden md:block text-[10px]">{text}</h2>
    </div>
  );
}
