import { useState } from "react";
import NationList from "./tabs/nations/nationList";
import NationStatistics from "./tabs/nations/nationStatistics";
import NationComs from "./tabs/nations/nationComs";
import { nationTabs } from "../settings/consts";
import TabNav from "../components/tabNav";
import { session } from "../settings/store";
// import AdBanner from "../components/ads/adBanner";
// import NationGlobe from "./tabs/nations/nationGlobe";

export default function Nations() {
  const [tab, setTab] = useState(nationTabs[0]);

  return (
    <>
      {/* <AdBanner /> */}
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
      {/* {tab.id === 0 && <NationGlobe text={tab.label} />} */}
      {tab.id === 1 && <NationList text={tab.label} />}
      {tab.id === 2 && <NationComs text={tab.label} />}
      {tab.id === 3 && <NationStatistics text={tab.label} />}
    </>
  );
}
