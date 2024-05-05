/* eslint-disable react-hooks/exhaustive-deps */
import H1 from "../../../components/titles/h1";
import NationIdentity from "../../../components/nations/dashboard/nationIdentity";
import { selectedNationAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import Places from "../../../components/nations/dashboard/places";
import { DashboardTabProps } from "../../../types/typProp";
import { useTranslation } from "react-i18next";
import Score from "../../../components/nations/dashboard/score";
import Diplomacy from "../../../components/nations/dashboard/diplomacy";
import Links from "../../../components/nations/dashboard/links";

export default function DashboardNation({ owner }: DashboardTabProps) {
  const [selectedNation] = useAtom(selectedNationAtom);
  const { t } = useTranslation();

  return (
    <>
      <H1 text={t("pages.dashboard.tabs.dashboard.title")} />
      <section className="w-full flex flex-wrap gap-8 items-start justify-between">
        <Score selectedNation={selectedNation} owner={owner} />
        <Links selectedNation={selectedNation} owner={owner} />
        <NationIdentity selectedNation={selectedNation} owner={owner} />
        <Places selectedNation={selectedNation} owner={owner} />
        <Diplomacy />
      </section>
    </>
  );
}
