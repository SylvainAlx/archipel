import Tag from "./tag";
import { GiCapitol } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Nation } from "../../../types/typNation";
import { useNavigate } from "react-router-dom";
import { placeListAtomV2 } from "../../../settings/store";
import { useAtom } from "jotai";

export interface CapitalTagProps {
  selectedNation: Nation;
}

export default function CapitalTag({ selectedNation }: CapitalTagProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [placeList] = useAtom(placeListAtomV2);
  const [capital, setCapital] = useState<string>(
    t("pages.nation.nationIdentity.noCapital"),
  );

  useEffect(() => {
    if (selectedNation.data.roleplay.capital != "") {
      setCapital(
        placeList.findPlaceName(
          selectedNation.data.roleplay.capital,
          t("pages.nation.nationIdentity.noCapital"),
        ),
      );
    } else {
      setCapital(t("pages.nation.nationIdentity.noCapital"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeList, selectedNation]);

  const handleClick = () => {
    if (typeof selectedNation.data.roleplay.capital === "string") {
      navigate("/place/" + selectedNation.data.roleplay.capital);
    }
  };

  return (
    <Tag
      hover={t("components.hoverInfos.tags.capital")}
      text={capital}
      bgColor="bg-info"
      click={
        selectedNation.data.roleplay.capital != "" ? handleClick : undefined
      }
    >
      <GiCapitol />
    </Tag>
  );
}
