/* eslint-disable react-hooks/exhaustive-deps */
import H1 from "../../../components/titles/h1";
import NationIdentity from "../../../components/nations/dashboard/nationIdentity";
import { selectedNationAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import Roleplay from "../../../components/nations/dashboard/roleplay";
import { DashboardTabProps } from "../../../types/typProp";
import { useTranslation } from "react-i18next";

export default function DashboardMain({ owner }: DashboardTabProps) {
  const [selectedNation] = useAtom(selectedNationAtom);
  const { t } = useTranslation();

  return (
    <>
      <H1 text={t("pages.dashboard.tabs.dashboard.title")} />
      <section className="w-full flex flex-wrap gap-8 items-start justify-between">
        <NationIdentity selectedNation={selectedNation} owner={owner} />
        <Roleplay selectedNation={selectedNation} owner={owner} />
      </section>
    </>
  );
}
