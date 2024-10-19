import Tag from "./tag";
import { GiBlackFlag } from "react-icons/gi";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { customTagProps } from "../../types/typProp";
import { nationsListAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function NationTag({ label }: customTagProps) {
  const { t } = useTranslation();
  const [nationList] = useAtom(nationsListAtom);
  const [nationName, setNationName] = useState(label);

  const navigate = useNavigate();

  useEffect(() => {
    nationList.forEach((nation) => {
      if (nation.officialId === label) {
        setNationName(nation.name);
      }
    });
  }, [label, nationList]);

  const handleClick = () => {
    if (typeof label === "string") {
      navigate("/nation/" + label.toLowerCase());
    }
  };

  return (
    <Tag
      text={typeof nationName === "string" ? nationName : ""}
      hover={t("components.hoverInfos.tags.nation")}
      bgColor="bg-info"
      children={<GiBlackFlag />}
      click={handleClick}
    />
  );
}
