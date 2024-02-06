import { useEffect, useState } from "react";
import TabNav from "../components/tabNav";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardCom from "./tabs/dashboard/dashboardCom";
import { nationAtom, selectedNationAtom } from "../settings/store";
import { useAtom } from "jotai";

export default function Dashboard() {
  const [myNation] = useAtom(nationAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [owner, setOwner] = useState(false);
  const [tabList, setTabList] = useState([{ id: 0, label: "TABLEAU DE BORD" }]);
  const [tab, setTab] = useState({ id: 0, label: "TABLEAU DE BORD" });

  useEffect(() => {
    if (myNation._id === selectedNation._id) {
      setTabList([
        ...tabList,
        { id: 1, label: "PARAMETRES" },
        { id: 2, label: "COMMUNICATIONS" },
      ]);
      setOwner(true);
    }
  }, []);

  return (
    <>
      <TabNav tabs={tabList} tabId={tab.id} setTab={setTab} />
      {tab.id === 0 && <DashboardMain text={tab.label} owner={owner} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardCom text={tab.label} />}
    </>
  );
}
