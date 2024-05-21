import Tag from "./tag";
import { GiCapitol } from "react-icons/gi";
import { nationPlacesListAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPlaceName } from "../../utils/functions";
import { Nation } from "../../types/typNation";

export interface CapitalTagProps {
  selectedNation: Nation;
}

export default function CapitalTag({ selectedNation }: CapitalTagProps) {
  const { t } = useTranslation();
  const [nationPlaceList] = useAtom(nationPlacesListAtom);
  const [capital, setCapital] = useState<string>(
    t("pages.nation.nationIdentity.noCapital"),
  );

  useEffect(() => {
    if (selectedNation.data.roleplay.capital != "") {
      const capitalName = getPlaceName(
        nationPlaceList,
        selectedNation.data.roleplay.capital,
        t("pages.nation.nationIdentity.noCapital"),
      );
      setCapital(capitalName);
    } else {
      setCapital(t("pages.nation.nationIdentity.noCapital"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationPlaceList, selectedNation]);

  return (
    <Tag
      hover={t("components.hoverInfos.tags.capital")}
      text={capital}
      bgColor="bg-info"
      children={
        <>
          <GiCapitol />
        </>
      }
    />
  );
}
