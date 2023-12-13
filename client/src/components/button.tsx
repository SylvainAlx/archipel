/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "../utils/types";
import { confirmBox, infoModal } from "../utils/store";
import { useAtom } from "jotai";

export default function Button({ path, text }: ButtonProps) {
  const [, setConfirm] = useAtom(confirmBox);
  const [, setInfo] = useAtom(infoModal)
  const navigate = useNavigate();

  const handleClick = () => {
    if (path === "logout") {
      setConfirm({
        action:"logout", 
        text: "Souhaitez-vous vous déconnecter ?", 
        result: "" 
      });
    } else if (path === "delete") {
      setConfirm({
        action: "delete",
        text: "Confirmez-vous la suppression définitive de votre nation ?",
        result: "",
      });
    } else if (path === "info") {
      setInfo("");
    } else {
      navigate(path);
    }
  };

  return (
    <button
      className="button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
