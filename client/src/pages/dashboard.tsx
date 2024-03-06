/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabNav from "../components/tabNav";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardCom from "./tabs/dashboard/dashboardCom";
import { nationAtom, selectedNationAtom } from "../settings/store";
import { useAtom } from "jotai";
import AdBanner from "../components/ads/adBanner";
import { getNation } from "../utils/api";
import Notification from "../components/notification";

export default function Dashboard() {
  const [nation] = useAtom(nationAtom);
  const [selectedNation, setSelectedNation] = useAtom(selectedNationAtom);
  const [owner, setOwner] = useState(false);
  const [tabList, setTabList] = useState<{ id: number; label: string }[]>([]);
  const [tab, setTab] = useState({ id: 0, label: "TABLEAU DE BORD" });
  const { id } = useParams();

  useEffect(() => {
    if (nation._id === id) {
      setSelectedNation(nation);
      setTabList([
        { id: 0, label: "TABLEAU DE BORD" },
        { id: 1, label: "PARAMETRES" },
        { id: 2, label: "COMMUNICATIONS" },
      ]);
      setOwner(true);
    } else if (selectedNation._id === "" && id) {
      getNation(id);
    } else if (id && selectedNation._id != id) {
      getNation(id);
    }
  }, [selectedNation]);

  return (
    <>
      <AdBanner />
      <div className="flex items-center">
        <TabNav tabs={tabList} tabId={tab.id} setTab={setTab} />
        {owner && <Notification owner={owner} />}
      </div>
      {tab.id === 0 && <DashboardMain text={tab.label} owner={owner} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardCom text={tab.label} />}
    </>
  );
}
