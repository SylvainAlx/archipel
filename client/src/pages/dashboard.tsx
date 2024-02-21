import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabNav from "../components/tabNav";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardCom from "./tabs/dashboard/dashboardCom";
import {
  confirmBox,
  infoModal,
  loadingSpinner,
  myStore,
  nationAtom,
  selectedNationAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { getOneNationFetch } from "../utils/fetch";
import { SERVEUR_LOADING_STRING } from "../settings/consts";
import { differenceEnMinutes } from "../utils/functions";
import AdBanner from "../components/ads/adBanner";

export default function Dashboard() {
  const [nation] = useAtom(nationAtom);
  const [selectedNation, setSelectedNation] = useAtom(selectedNationAtom);
  const [, setInfo] = useAtom(infoModal);
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
      myStore.set(loadingSpinner, { show: true, text: SERVEUR_LOADING_STRING });
      getOneNationFetch(id)
        .then((data) => {
          myStore.set(loadingSpinner, { show: false, text: "" });
          if (data.nation) {
            setSelectedNation({
              _id: data.nation._id,
              name: data.nation.name,
              role: data.nation.role,
              data: data.nation.data,
              createdAt: data.nation.createdAt,
            });
          } else {
            myStore.set(loadingSpinner, { show: false, text: "" });
            setInfo(data.message);
          }
        })
        .catch((error) => {
          myStore.set(loadingSpinner, { show: false, text: "" });
          setInfo(error.message);
        });
    }
  }, [selectedNation]);

  useEffect(() => {
    if (owner) {
      const reward = differenceEnMinutes(
        selectedNation.data.roleplay.lastUpdated,
      );
      if (reward > 0) {
        const updatedNation = { ...selectedNation };
        updatedNation.data.roleplay.credits += reward;
        updatedNation.data.roleplay.lastUpdated = new Date();
        setConfirm({
          action: "updateNation",
          text: reward + " nouveau(x) crédit(s) ! Récupérer ?",
          result: "",
          target: "",
          payload: updatedNation,
        });
      }
    }
  }, [owner]);

  return (
    <>
      <TabNav tabs={tabList} tabId={tab.id} setTab={setTab} />
      {tab.id === 0 && <DashboardMain text={tab.label} owner={owner} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardCom text={tab.label} />}
      <AdBanner />
    </>
  );
}
