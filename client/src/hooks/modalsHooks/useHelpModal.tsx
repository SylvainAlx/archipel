import { useTranslation } from "react-i18next";
import { StandardOption } from "../../types/typAtom";
import { useState } from "react";

export function useHelpModal() {
  const { t } = useTranslation();
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

  return {
    helpTabs,
    tab,
    setTab,
    t,
  };
}
