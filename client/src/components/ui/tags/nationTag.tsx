import Tag from "./tag";
import { GiBlackFlag } from "react-icons/gi";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { customTagProps } from "../../../types/typProp";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { nationListAtomV2 } from "../../../settings/store";

export default function NationTag({ label }: customTagProps) {
  const { t } = useTranslation();
  const [nationList] = useAtom(nationListAtomV2);
  const [nationName, setNationName] = useState(label);

  const navigate = useNavigate();

  useEffect(() => {
    nationList.getItems().forEach((nation) => {
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
      click={handleClick}
    >
      <GiBlackFlag />
    </Tag>
  );
}
