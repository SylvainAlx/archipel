/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabNav from "../components/tabNav";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardCom from "./tabs/dashboard/dashboardCom";
import { confirmBox, nationAtom, selectedNationAtom } from "../settings/store";
import { useAtom } from "jotai";
import { differenceEnMinutes } from "../utils/functions";
import AdBanner from "../components/ads/adBanner";
import { getNation } from "../utils/api";

export default function Dashboard() {
  const [nation] = useAtom(nationAtom);
  const [selectedNation, setSelectedNation] = useAtom(selectedNationAtom);
  const [, setConfirm] = useAtom(confirmBox);
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

  useEffect(() => {
    if (owner) {
      const reward = differenceEnMinutes(
        selectedNation.data.roleplay.lastUpdated,
      );
      if (reward > 0) {
        const updatedNation = { ...selectedNation };
        const bonus = Math.ceil(
          (reward * updatedNation.data.roleplay.points) / 10,
        );
        const totalReward = reward + bonus;
        updatedNation.data.roleplay.credits += totalReward;
        updatedNation.data.roleplay.lastUpdated = new Date();
        setConfirm({
          action: "updateNation",
          text: totalReward + " nouveau(x) crédit(s) ! Récupérer ?",
          result: "",
          target: "",
          payload: updatedNation,
        });
      }
    }
  }, [owner]);

  return (
    <>
      <AdBanner />
      <TabNav tabs={tabList} tabId={tab.id} setTab={setTab} />
      {tab.id === 0 && <DashboardMain text={tab.label} owner={owner} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardCom text={tab.label} />}
    </>
  );
}
