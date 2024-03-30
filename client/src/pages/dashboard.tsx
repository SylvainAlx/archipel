/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabNav from "../components/tabNav";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardCom from "./tabs/dashboard/dashboardCom";
import {
  langAtom,
  nationAtom,
  ownerAtom,
  selectedNationAtom,
} from "../settings/store";
import { useAtom } from "jotai";
// import AdBanner from "../components/ads/adBanner";
import { getNation } from "../api/nation/nationAPI";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const [lang] = useAtom(langAtom);
  const [nation] = useAtom(nationAtom);
  const [selectedNation, setSelectedNation] = useAtom(selectedNationAtom);
  const [owner] = useAtom(ownerAtom);
  const [tabList, setTabList] = useState<{ id: number; label: string }[]>([]);
  const [tab, setTab] = useState({
    id: 0,
    label: t("pages.dashboard.tabs.dashboard.title"),
  });
  const { id } = useParams();

  useEffect(() => {
    if (nation.officialId === id) {
      setSelectedNation(nation);
      setTabList([
        { id: 0, label: t("pages.dashboard.tabs.dashboard.title") },
        { id: 1, label: t("pages.dashboard.tabs.params.title") },
        { id: 2, label: t("pages.dashboard.tabs.coms.title") },
      ]);
    } else if (selectedNation.officialId === "" && id) {
      getNation(id);
    } else if (id && selectedNation.officialId != id) {
      getNation(id);
    }
  }, [selectedNation, lang]);

  return (
    <>
      {/* <AdBanner /> */}
      <div className="flex items-center">
        <TabNav tabs={tabList} tabId={tab.id} setTab={setTab} owner={owner} />
      </div>
      {tab.id === 0 && <DashboardMain owner={owner} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardCom text={tab.label} />}
    </>
  );
}
