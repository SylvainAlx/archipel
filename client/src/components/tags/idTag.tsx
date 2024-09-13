import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function IdTag({ label }: customTagProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof label === "string") {
      switch (label.toLowerCase().charAt(2)) {
        case "c":
          navigate("/citizen/" + label.toLowerCase());
          return true; // Cas où le 3ème caractère est 'c'
        case "n":
          navigate("/nation/" + label.toLowerCase());
          return true; // Cas où le 3ème caractère est 'n'
        default:
          return false; // Si ce n'est ni 'c', 'p', ni 'n'
      }
    }
  };

  return (
    <Tag
      text={label.toString().toUpperCase()}
      hover={t("components.hoverInfos.tags.id")}
      bgColor="bg-complementary3"
      // textStyle="uppercase"
      children={<TbWorld />}
      click={handleClick}
    />
  );
}
