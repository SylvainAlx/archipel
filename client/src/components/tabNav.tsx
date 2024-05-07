import { nationTabs } from "../settings/consts";
import Notification from "./notification";

export interface TabNavProps {
  tabs: Array<{ id: number; label: string }>;
  tabId: number;
  setTab: React.Dispatch<React.SetStateAction<{ id: number; label: string }>>;
  owner: boolean;
}

export default function TabNav({ tabs, tabId, setTab, owner }: TabNavProps) {
  return (
    <nav className="w-max flex flex-col md:flex-row justify-center items-center gap-[2px] rounded overflow-hidden">
      {owner && tabs != nationTabs && <Notification text="!" />}
      {tabs.map((tab, i) => {
        return (
          <div
            className={`${
              tab.id === tabId
                ? "bg-secondary"
                : "bg-complementary cursor-pointer"
            } w-full min-w-[300px] md:min-w-max p-2 flex items-center justify-center hover:bg-secondary transition-all duration-300`}
            key={i}
            onClick={() => setTab(tab)}
          >
            {tab.label.toUpperCase()}
          </div>
        );
      })}
    </nav>
  );
}
