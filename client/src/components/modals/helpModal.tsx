import { myStore, showHelpAtom } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";
import TabNav from "../tabNav";
import { StandardOption } from "../../types/typAtom";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function HelpModal() {
  const { t } = useTranslation();
  const modalRef = useModal(() => myStore.set(showHelpAtom, false));

  const helpTabs: StandardOption[] = [
    {
      id: 1,
      label: t("components.modals.helpModal.citizen.title"),
      descriptions: t("components.modals.helpModal.citizen.description"),
    },
    {
      id: 2,
      label: t("components.modals.helpModal.nation.title"),
      descriptions: t("components.modals.helpModal.nation.description"),
    },
    {
      id: 3,
      label: t("components.modals.helpModal.relations.title"),
      descriptions: t("components.modals.helpModal.relations.description"),
    },
    {
      id: 4,
      label: t("components.modals.helpModal.places.title"),
      descriptions: t("components.modals.helpModal.places.description"),
    },
    {
      id: 5,
      label: t("components.modals.helpModal.coms.title"),
      descriptions: t("components.modals.helpModal.coms.description"),
    },
    {
      id: 6,
      label: t("components.modals.helpModal.credits.title"),
      descriptions: t("components.modals.helpModal.credits.description"),
    },
  ];

  const [tab, setTab] = useState(helpTabs[0]);

  return (
    <div
      tabIndex={-1}
      ref={modalRef}
      className="w-full flex flex-col items-center gap-2"
    >
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.helpModal.title")}
      </h2>
      <TabNav
        tabs={helpTabs}
        tabId={tab.id}
        click={(id: number) => setTab(helpTabs[id - 1])}
        bgColor="bg-complementary2"
      />
      <article className="w-full max-h-96 flex flex-col items-center gap-2 overflow-y-auto">
        <MDEditor.Markdown
          className="presentation"
          source={helpTabs[Number(tab.id) - 1].descriptions}
        />
      </article>
      <Button
        text={t("components.buttons.close")}
        click={() => myStore.set(showHelpAtom, false)}
        widthFull={true}
      />
    </div>
  );
}
