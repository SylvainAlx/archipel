import { useState } from "react";
import TabNav from "../components/tabNav";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardCom from "./tabs/dashboard/dashboardCom";
import { nationAtom, selectedNationAtom } from "../settings/store";
import { useAtom } from "jotai";

export default function Dashboard() {
  const [myNation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);

  let DashboardTabs = [{ id: 0, label: "TABLEAU DE BORD" }];

  if (myNation.name === selectedNation.name) {
    DashboardTabs = [
      ...DashboardTabs,
      { id: 1, label: "PARAMETRES" },
      { id: 2, label: "CONTACT" },
    ];
  }

  const [tab, setTab] = useState(DashboardTabs[0]);

  return (
    <>
      <TabNav tabs={DashboardTabs} tabId={tab.id} setTab={setTab} />
      {tab.id === 0 && <DashboardMain text={tab.label} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardCom text={tab.label} />}
    </>
  );
}
