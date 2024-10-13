import Tag from "./tag";
import { GiBlackFlag } from "react-icons/gi";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { customTagProps } from "../../types/typProp";

export default function NationTag({ label }: customTagProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof label === "string") {
      navigate("/nation/" + label.toLowerCase());
    }
  };

  return (
    <Tag
      text={typeof label === "string" ? label : ""}
      hover={t("components.hoverInfos.tags.nation")}
      bgColor="bg-info"
      children={<GiBlackFlag />}
      click={handleClick}
    />
  );
}
