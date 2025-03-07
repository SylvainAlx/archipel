import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StandardOption } from "../../types/typAtom";
import { useTranslation } from "react-i18next";

export function useExplore() {
  const { t } = useTranslation();
  const nationTabs: StandardOption[] = [
    { id: 1, label: t("pages.explore.stats.title") },
    { id: 2, label: t("pages.explore.nationsList.title") },
    { id: 3, label: t("pages.explore.citizensList.title") },
    { id: 4, label: t("pages.explore.placesList.title") },
    { id: 5, label: t("pages.explore.comsList.title") },
  ];
  const [tab, setTab] = useState(nationTabs[0]);
  const param = useParams();

  useEffect(() => {
    if (param.id != undefined) {
      setTab(nationTabs[Number(param.id) - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  return { nationTabs, tab };
}
