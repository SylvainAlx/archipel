/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { confirmBox, infoModalAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { ButtonProps } from "../../types/typProp";
import { useTranslation } from "react-i18next";

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
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (path === "logout") {
      setConfirm({
        action: "logout",
        text: t("components.modals.confirmModal.logout"),
        result: "",
      });
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
      className={`overflow-hidden ${disabled ? "bg-complementary2" : bgColor ? bgColor : "bg-secondary"} ${!disabled && "hover:text-primary hover:bg-light"} animate-fadeIn w-full max-w-[300px] h-[30px] flex justify-center items-center gap-2 rounded shadow-md py-2 px-4 transition-all duration-300`}
      onClick={click ? click : handleClick}
    >
      {children}
      {text != "" && <span>{text}</span>}
    </button>
  );
}
