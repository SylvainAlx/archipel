/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import {
  confirmBox,
  infoModalAtom,
  nationAtom,
  selectedNationAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { ButtonProps } from "../types/typProp";

export default function Button({
  type,
  path,
  text,
  bgColor,
  disabled,
  children,
  click,
}: ButtonProps) {
  const [, setConfirm] = useAtom(confirmBox);
  const [, setInfo] = useAtom(infoModalAtom);
  const [, setSelectedNation] = useAtom(selectedNationAtom);
  const [nation] = useAtom(nationAtom);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path === "logout") {
      setConfirm({
        action: "logout",
        text: "Souhaitez-vous vous déconnecter ?",
        result: "",
      });
    } else if (path === "delete") {
      setConfirm({
        action: "deleteSelfNation",
        text: "Confirmez-vous la suppression définitive de votre nation ?",
        result: "",
      });
    } else if (path === "dashboard") {
      setSelectedNation(nation);
      navigate(path);
    } else if (path === "info") {
      setInfo("");
    } else {
      if (path !== "") {
        navigate(path);
      }
    }
  };

  return (
    <button
      disabled={disabled != undefined && disabled && disabled}
      type={type != undefined ? type : "button"}
      className={`${disabled ? "bg-complementary2" : bgColor ? bgColor : "bg-secondary"} ${!disabled && "hover:text-primary hover:bg-light"} animate-fadeIn w-full max-w-[300px] flex justify-center rounded-md py-2 px-4 transition-all duration-300`}
      onClick={click ? click : handleClick}
    >
      {text != "" && text}
      {children}
    </button>
  );
}
