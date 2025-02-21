import { myStore, showHelpAtom } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";
import TabNav from "../tabNav";
import { StandardOption } from "../../types/typAtom";
import { useState } from "react";
import H3 from "../titles/h3";

export default function HelpModal() {
  const { t } = useTranslation();
  const modalRef = useModal(() => myStore.set(showHelpAtom, false));

  const helpTabs: StandardOption[] = [
    {
      id: 1,
      label: "Les citoyens",
      descriptions:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem",
    },
    {
      id: 2,
      label: "Les nations",
      descriptions:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem",
    },
    {
      id: 3,
      label: "Les relations diplomatiques",
      descriptions:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem",
    },
    {
      id: 4,
      label: "Les lieux",
      descriptions:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem",
    },
    {
      id: 5,
      label: "Les communiqués",
      descriptions:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem",
    },
    {
      id: 6,
      label: "Les crédits",
      descriptions:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem",
    },
  ];

  const [tab, setTab] = useState(helpTabs[0]);

  return (
    <div
      tabIndex={-1}
      ref={modalRef}
      className="w-full flex flex-col items-center gap-2"
    >
      <TabNav
        tabs={helpTabs}
        tabId={tab.id}
        click={(id: number) => setTab(helpTabs[id - 1])}
        bgColor="bg-complementary2"
      />
      <article className="flex flex-col items-center gap-2">
        <H3 text={helpTabs[Number(tab.id) - 1].label} />
        <p>{helpTabs[Number(tab.id) - 1].descriptions}</p>
      </article>
      <Button
        text={t("components.buttons.close")}
        click={() => myStore.set(showHelpAtom, false)}
        widthFull={true}
      />
    </div>
  );
}
