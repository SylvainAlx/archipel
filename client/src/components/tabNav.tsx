import { TabNavProps } from "../types/typProp";

export default function TabNav({ tabs, tabId, setTab }: TabNavProps) {
  return (
    <nav className="w-[300px] md:w-[80%] flex flex-col md:flex-row justify-center items-center gap-[2px] rounded-xl overflow-hidden">
      {tabs.map((tab, i) => {
        return (
          <div
            className={`${
              tab.id === tabId
                ? "bg-secondary"
                : "bg-complementary cursor-pointer"
            } w-full p-2 flex items-center justify-center hover:text-primary hover:bg-light transition-all duration-300`}
            key={i}
            onClick={() => setTab(tab)}
          >
            {tab.label}
          </div>
        );
      })}
    </nav>
  );
}
