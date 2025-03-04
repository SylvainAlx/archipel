import { myStore, showHelpAtom } from "../../settings/store";
import Button from "../../components/buttons/button";
import { useModal } from "../../hooks/useModal";
import TabNav from "../../components/tabNav";
import MDEditor from "@uiw/react-md-editor";
import { useHelpModal } from "../../hooks/modalsHooks/useHelpModal";

export default function HelpModal() {
  const { helpTabs, tab, setTab, t } = useHelpModal();
  const modalRef = useModal(() => myStore.set(showHelpAtom, false));

  return (
    <div
      tabIndex={-1}
      ref={modalRef}
      className="w-full max-h-full flex flex-col items-center gap-2"
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
      <article className="w-full max-h-72 flex flex-col items-center gap-2 overflow-y-auto">
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
