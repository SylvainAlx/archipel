import { useState } from "react";
import NationList from "./tabs/nationList";
import NationStatistics from "./tabs/nationStatistics";

export default function Nations() {
  const [tab,setTab] = useState(0)

  return (
    <>
      <nav className="w-full flex justify-center items-center gap-6">
        <div className="p-2 cursor-pointer bg-secondary" onClick={()=>setTab(0)}>LISTE DES NATIONS</div>
        <div className="p-2 cursor-pointer bg-secondary" onClick={()=>setTab(1)}>STATISTIQUES</div>
      </nav>
      {tab === 0 && <NationList />}
      {tab === 1 && <NationStatistics />}
    </>
  );
}
