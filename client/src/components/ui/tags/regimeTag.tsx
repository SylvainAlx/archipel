import Tag from "./tag";
import { FaCrown, FaPersonMilitaryPointing, FaQuestion } from "react-icons/fa6";
import { MdHowToVote } from "react-icons/md";
import { useEffect, useState } from "react";
import { createTagRegime } from "../../../utils/functions";
import { SelectedNationProps } from "../../../types/typProp";
import { useTranslation } from "react-i18next";

export default function RegimeTag({ selectedNation }: SelectedNationProps) {
  const { t } = useTranslation();
  const [regime, setRegime] = useState({
    id: 0,
    label: "",
    type: 0,
    bgColor: "bg-regime_0",
  });
  useEffect(() => {
    setRegime(createTagRegime(selectedNation.data.general.regime));
  }, [selectedNation]);

  return (
    <Tag
      text={regime.label.toString()}
      hover={t("components.hoverInfos.tags.regime")}
      bgColor={regime.bgColor}
    >
      <>
        {regime.type === 0 && <FaQuestion />}
        {regime.type === 1 && <MdHowToVote />}
        {regime.type === 2 && <FaCrown />}
        {regime.type === 3 && <FaPersonMilitaryPointing />}
      </>
    </Tag>
  );
}
