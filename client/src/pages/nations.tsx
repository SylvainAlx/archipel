import { useState } from "react";
import NationList from "./tabs/nations/nationList";
import NationStatistics from "./tabs/nations/nationStatistics";
import NationComs from "./tabs/nations/nationComs";
import { nationTabs } from "../settings/consts";
import TabNav from "../components/tabNav";
// import AdBanner from "../components/ads/adBanner";
// import NationGlobe from "./tabs/nations/nationGlobe";
import { ownerAtom } from "../settings/store";
import { useAtom } from "jotai";

export default function Nations() {
  const [tab, setTab] = useState(nationTabs[0]);
  const [owner] = useAtom(ownerAtom);

  return (
    <>
      {/* <AdBanner /> */}
      <div className="flex items-center">
        <TabNav
          tabs={nationTabs}
          tabId={tab.id}
          setTab={setTab}
          owner={owner}
        />
      </div>
      {/* {tab.id === 0 && <NationGlobe text={tab.label} />} */}
      {tab.id === 1 && <NationList text={tab.label} />}
      {tab.id === 2 && <NationComs text={tab.label} />}
      {tab.id === 3 && <NationStatistics text={tab.label} />}
    </>
  );
}
