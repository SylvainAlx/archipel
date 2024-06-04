import { useState } from "react";
import NationList from "./tabs/nations/nationList";
import NationStatistics from "./tabs/nations/nationStatistics";
import TabNav from "../components/tabNav";
import { session } from "../settings/store";
import { useTranslation } from "react-i18next";
import { StandardOption } from "../types/typAtom";

export default function Nations() {
  const { t } = useTranslation();

  const nationTabs: StandardOption[] = [
    { id: 1, label: t("pages.nations.nationsList.title") },
    { id: 2, label: t("pages.nations.stats.title") },
  ];

  const [tab, setTab] = useState(nationTabs[0]);

  return (
    <>
      <div className="flex items-center">
        <TabNav
          tabs={nationTabs}
          tabId={tab.id}
          setTab={setTab}
          owner={
            session.nation != undefined &&
            session.nation.owner === session.user.officialId
          }
        />
      </div>
      {tab.id === 1 && <NationList />}
      {tab.id === 2 && <NationStatistics />}
    </>
  );
}
