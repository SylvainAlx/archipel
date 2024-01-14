import { TabNavProps } from '../types/typProp'

export default function TabNav({ tabs, tabId, setTab }: TabNavProps) {
  return (
    <nav className="w-max flex flex-col md:flex-row justify-center items-center gap-[2px] rounded overflow-hidden">
      {tabs.map((tab, i) => {
        return (
          <div
            className={`${
              tab.id === tabId
                ? 'bg-secondary'
                : 'bg-complementary cursor-pointer'
            } w-full min-w-[300px] md:min-w-max p-2 flex items-center justify-center hover:bg-secondary transition-all duration-300`}
            key={i}
            onClick={() => setTab(tab)}
          >
            {tab.label}
          </div>
        )
      })}
    </nav>
  )
}
