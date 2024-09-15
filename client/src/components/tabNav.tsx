import { StandardOption } from "../types/typAtom";

export interface TabNavProps {
  tabs: Array<StandardOption>;
  tabId: number | string;
  setTab: React.Dispatch<
    React.SetStateAction<{ id: number | string; label: string }>
  >;
  owner: boolean;
}

export default function TabNav({ tabs, tabId, setTab }: TabNavProps) {
  return (
    <nav className="w-max flex flex-col md:flex-row justify-center items-center gap-[2px] rounded overflow-hidden">
      {tabs.map((tab, i) => {
        return (
          <div
            className={`${
              tab.id === tabId
                ? "bg-gradient-to-r from-secondary2 to-secondary"
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
