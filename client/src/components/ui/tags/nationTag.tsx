import Tag from "./tag";
import { GiBlackFlag } from "react-icons/gi";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { nationListAtomV2 } from "../../../settings/store";
import { MdTimer } from "react-icons/md";
import { UserModel } from "../../../models/userModel";

interface NationTagProps {
  label: string;
  citizen?: UserModel;
}

export default function NationTag({ label, citizen }: NationTagProps) {
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
      bgColor={"bg-info"}
      click={handleClick}
    >
      <>
        {citizen && citizen.citizenship.status === 0 && <MdTimer />}
        <GiBlackFlag />
      </>
    </Tag>
  );
}
