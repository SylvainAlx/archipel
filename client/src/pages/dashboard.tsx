import { useState } from "react";
import TabNav from "../components/tabNav";
import { DashboardTabs } from "../settings/consts";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardContact from "./tabs/dashboard/dashboardContact";

export default function Dashboard() {
  const [tab, setTab] = useState(DashboardTabs[0]);
  return (
    <>
      <TabNav tabs={DashboardTabs} tabId={tab.id} setTab={setTab} />
      {tab.id === 0 && <DashboardMain text={tab.label} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardContact text={tab.label} />}
    </>
  );
}
