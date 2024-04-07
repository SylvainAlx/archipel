import Tag from "./tag";
import { GiCapitol } from "react-icons/gi";
import { nationPlacesListAtom } from "../../settings/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCapitalName } from "../../utils/functions";
import { SelectedNationProps } from "../../types/typProp";

export default function CapitalTag({ selectedNation }: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationPlaceList] = useAtom(nationPlacesListAtom);
  const [capital, setCapital] = useState<string>(
    t("pages.dashboard.tabs.dashboard.nationIdentity.noCapital"),
  );

  useEffect(() => {
    if (selectedNation.data.roleplay.capital != "") {
      const capitalName = getCapitalName(
        nationPlaceList,
        selectedNation.data.roleplay.capital,
      );
      if (capitalName != "") {
        setCapital(capitalName);
      } else {
        setCapital(
          t("pages.dashboard.tabs.dashboard.nationIdentity.noCapital"),
        );
      }
    }
  }, [nationPlaceList, selectedNation, t]);

  return (
    <Tag
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
