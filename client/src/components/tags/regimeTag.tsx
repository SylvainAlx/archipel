import Tag from "../tag";
import { FaCrown, FaPersonMilitaryPointing, FaQuestion } from "react-icons/fa6";
import { MdHowToVote } from "react-icons/md";
import { useEffect, useState } from "react";
import { langAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { createTagRegime } from "../../utils/functions";
import { SelectedNationProps } from "../../types/typProp";

export default function RegimeTag({ selectedNation }: SelectedNationProps) {
  const [lang] = useAtom(langAtom);
  const [regime, setRegime] = useState({
    id: 0,
    label: "",
    type: 0,
    bgColor: "bg-regime_0",
  });
  useEffect(() => {
    setRegime(createTagRegime(selectedNation.data.general.regime));
  }, [lang, selectedNation]);

  return (
    <Tag
      text={regime.label.toString()}
      bgColor={regime.bgColor}
      children={
        <>
          {regime.type === 0 && <FaQuestion />}
          {regime.type === 1 && <MdHowToVote />}
          {regime.type === 100 && <FaCrown />}
          {regime.type === 200 && <FaPersonMilitaryPointing />}
        </>
      }
    />
  );
}
