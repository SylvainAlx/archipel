import { useState } from "react";
import NationList from "./tabs/nationList";
import NationStatistics from "./tabs/nationStatistics";
import NationComs from "./tabs/nationComs";
import { nationTabs } from "../settings/consts";

export default function Nations() {
  const [tab, setTab] = useState(nationTabs[0]);

  return (
    <>
      <nav className="w-[300px] md:w-[80%] flex flex-col md:flex-row justify-center items-center gap-[2px] rounded-xl overflow-hidden">
        {nationTabs.map((tab, i) => {
          return (
            <div
              className="w-full p-2 cursor-pointer bg-secondary flex items-center justify-center hover:text-primary hover:bg-light transition-all duration-300"
              key={i}
              onClick={() => setTab(tab)}
            >
              {tab.label}
            </div>
          );
        })}
      </nav>
      {tab.id === 0 && <NationList text={tab.label} />}
      {tab.id === 1 && <NationStatistics text={tab.label} />}
      {tab.id === 2 && <NationComs text={tab.label} />}
    </>
  );
}
