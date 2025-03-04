import { StandardOption } from "../types/typAtom";

export interface TabNavProps {
  tabs: Array<StandardOption>;
  tabId: number | string;
  click: (id: number) => void;
  bgColor?: string;
}

export default function TabNav({ tabs, tabId, click, bgColor }: TabNavProps) {
  return (
    <nav className="flex flex-wrap justify-center items-center gap-[2px] rounded overflow-hidden">
      {tabs.map((tab, i) => {
        return (
          <button
            key={i}
            className={`relative ${
              tab.id === tabId
                ? "bg-gradient-to-r from-secondary2 to-secondary"
                : bgColor
                  ? `${bgColor} cursor-pointer`
                  : "bg-complementary cursor-pointer"
            } min-w-[300px] md:min-w-max p-2 flex items-center justify-center hover:bg-secondary transition-all duration-300`}
            onClick={() => click(Number(tab.id))}
          >
            {tab.label.toUpperCase()}
          </button>
        );
      })}
    </nav>
  );
}
