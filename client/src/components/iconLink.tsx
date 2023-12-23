import { useNavigate } from "react-router-dom";
import {
  IoMdLogIn,
  IoMdAddCircleOutline,
  IoIosPie,
  IoMdSettings,
  IoMdLogOut,
  IoMdGlobe,
} from "react-icons/io";
import { confirmBox } from "../utils/store";
import { useAtom } from "jotai";
import { ButtonProps } from "../types/typProp";

export default function IconLink({ path, text }: ButtonProps) {
  const [, setConfirm] = useAtom(confirmBox);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path === "/logout") {
      setConfirm({
        action: "logout",
        text: "Souhaitez-vous vous déconnecter ?",
        result: "",
      });
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 items-center text-5xl"
      onClick={handleClick}
    >
      {path === "/nations" && <IoMdGlobe />}
      {path === "/login" && <IoMdLogIn />}
      {path === "/register" && <IoMdAddCircleOutline />}
      {path === "/dashboard" && <IoIosPie />}
      {path === "/admin" && <IoMdSettings />}
      {path === "/logout" && <IoMdLogOut />}
      <h2 className="text-[10px]">{text}</h2>
    </div>
  );
}
