/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { ButtonProps } from "../utils/types";
import { DeleteSelfFetch } from "../utils/fetch";
import { confirmBox } from "../utils/store";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Button({ path, text }: ButtonProps) {
  const [confirm, setConfirm] = useAtom(confirmBox);
  const navigate = useNavigate();

  useEffect(() => {
    if (path === "logout") {
      if (confirm.result === "OK") {
        localStorage.removeItem("jwt");
        navigate("/");
        window.location.reload();
      }
    }
    if (path === "delete") {
      if (confirm.result === "OK") {
        DeleteSelfFetch()
          .then((resp) => {
            alert(resp.message);
            localStorage.removeItem("jwt");
            navigate("/");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [confirm]);

  const handleClick = () => {
    if (path === "logout") {
      setConfirm({ text: "Souhaitez-vous vous déconnecter ?", result: "" });
    } else if (path === "delete") {
      setConfirm({
        text: "Confirmez-vous la suppression définitive de votre nation ?",
        result: "",
      });
    } else {
      navigate(path);
    }
  };

  return (
    <button
      className="inline-block rounded-lg px-3 py-2 text-xs font-medium bg-white text-black"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
