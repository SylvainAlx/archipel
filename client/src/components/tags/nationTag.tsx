import Tag from "./tag";
import { GiBlackFlag } from "react-icons/gi";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdGrade } from "react-icons/md";

interface NationTagProps {
  label: string;
  founder: boolean;
}

export default function NationTag({ label, founder }: NationTagProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/nation/" + label.toLowerCase());
  };

  return (
    <Tag
      text={label}
      hover={t("components.hoverInfos.tags.nation")}
      bgColor="bg-info"
      children={
        <>
          <GiBlackFlag />
          {founder && <MdGrade />}
        </>
      }
      click={handleClick}
    />
  );
}
