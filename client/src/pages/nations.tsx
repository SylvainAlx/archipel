import { useState } from "react";
import NationList from "./tabs/nations/nationList";
import NationStatistics from "./tabs/nations/nationStatistics";
import NationComs from "./tabs/nations/nationComs";
import { nationTabs } from "../settings/consts";
import TabNav from "../components/tabNav";
import AdBanner from "../components/ads/adBanner";
import NationGlobe from "./tabs/nations/nationGlobe";

export default function Nations() {
  const [tab, setTab] = useState(nationTabs[0]);

  return (
    <>
      <AdBanner />
      <TabNav tabs={nationTabs} tabId={tab.id} setTab={setTab} />
      {tab.id === 0 && <NationGlobe text={tab.label} />}
      {tab.id === 1 && <NationComs text={tab.label} />}
      {tab.id === 2 && <NationList text={tab.label} />}
      {tab.id === 3 && <NationStatistics text={tab.label} />}
    </>
  );
}
