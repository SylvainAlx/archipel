import { useEffect, useState } from "react";
import TabNav from "../components/tabNav";
import { session } from "../settings/store";
import { useTranslation } from "react-i18next";
import { StandardOption } from "../types/typAtom";
import NationList from "./exploreTabs/nationList";
import Stats from "./exploreTabs/stats";
import CitizenList from "./exploreTabs/citizenList";
import PlaceList from "./exploreTabs/placeList";
import ComList from "./exploreTabs/comList";
import { useParams } from "react-router-dom";

export default function Explore() {
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
  }, [param.id]);

  return (
    <>
      <div className="flex items-center">
        <TabNav
          tabs={nationTabs}
          tabId={tab.id}
          owner={
            session.nation != undefined &&
            session.nation.owner === session.user.officialId
          }
        />
      </div>
      {tab.id === 1 && <Stats text={tab.label} />}
      {tab.id === 2 && <NationList text={tab.label} />}
      {tab.id === 3 && <CitizenList text={tab.label} />}
      {tab.id === 4 && <PlaceList text={tab.label} />}
      {tab.id === 5 && <ComList text={tab.label} />}
    </>
  );
}
