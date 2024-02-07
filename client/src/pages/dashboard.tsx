import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabNav from "../components/tabNav";
import DashboardMain from "./tabs/dashboard/dashboardMain";
import DashboardSettings from "./tabs/dashboard/dashboardSettings";
import DashboardCom from "./tabs/dashboard/dashboardCom";
import {
  infoModal,
  loadingSpinner,
  nationAtom,
  selectedNationAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { getOneNationFetch } from "../utils/fetch";
import { SERVEUR_LOADING_STRING } from "../settings/consts";

export default function Dashboard() {
  const [nation] = useAtom(nationAtom);
  const [selectedNation, setSelectedNation] = useAtom(selectedNationAtom);
  const [, setLoading] = useAtom(loadingSpinner);
  const [, setInfo] = useAtom(infoModal);
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
      setLoading({ show: true, text: SERVEUR_LOADING_STRING });
      getOneNationFetch(id)
        .then((data) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          if (data.nation) {
            setSelectedNation({
              _id: data.nation._id,
              name: data.nation.name,
              role: data.nation.role,
              data: data.nation.data,
              createdAt: data.nation.createdAt,
            });
          } else {
            setLoading({ show: false, text: SERVEUR_LOADING_STRING });
            setInfo(data.message);
          }
        })
        .catch((error) => {
          setLoading({ show: false, text: SERVEUR_LOADING_STRING });
          setInfo(error.message);
        });
    }
  }, [selectedNation]);

  return (
    <>
      <TabNav tabs={tabList} tabId={tab.id} setTab={setTab} />
      {tab.id === 0 && <DashboardMain text={tab.label} owner={owner} />}
      {tab.id === 1 && <DashboardSettings text={tab.label} />}
      {tab.id === 2 && <DashboardCom text={tab.label} />}
    </>
  );
}
