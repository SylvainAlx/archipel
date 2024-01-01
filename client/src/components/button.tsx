/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import {
  confirmBox,
  infoModal,
  nationAtom,
  selectedNationAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { ButtonProps } from "../types/typProp";

export default function Button({
  type,
  path,
  text,
  disabled,
  click,
}: ButtonProps) {
  const [, setConfirm] = useAtom(confirmBox);
  const [, setInfo] = useAtom(infoModal);
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
        action: "delete",
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
      disabled={disabled != undefined && disabled}
      type={type != undefined ? type : "button"}
      className="inline-block rounded-full py-2 px-4 bg-secondary transition-all duration-300 hover:text-primary hover:bg-light"
      onClick={click ? click : handleClick}
    >
      {text}
    </button>
  );
}
