import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = () => {
    navigate("/");
  };
  const subtitle = t("components.logo.subtitle").split(" ");

  return (
    <div
      onClick={handleClick}
      className="flex gap-2 h-[50px] w-full md:w-min items-center"
    >
      <img src="/logo.png" className="cursor-pointer h-full"></img>
      <h4 className="text-md lg:text-xl xl:text-2xl">
        {subtitle.map((word, i) => {
          return <div key={i}>{word}</div>;
        })}
      </h4>
    </div>
  );
}
