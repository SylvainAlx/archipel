/* eslint-disable react-hooks/exhaustive-deps */
import H1 from "../../../components/titles/h1";
import GeneralInformations from "../../../components/nations/dashboard/generalInformations";
import { selectedNationAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import DashStatistics from "../../../components/nations/dashboard/dashStatistics";
import { DashboardTabProps } from "../../../types/typProp";
import RolePlay from "../../../components/nations/dashboard/roleplay";

export default function DashboardMain({ text, owner }: DashboardTabProps) {
  const [selectedNation] = useAtom(selectedNationAtom);

  return (
    <>
      <H1 text={text} />
      <section className="w-full flex flex-wrap gap-8 items-start justify-between">
        <GeneralInformations selectedNation={selectedNation} owner={owner} />
        <DashStatistics selectedNation={selectedNation} owner={owner} />
        <RolePlay selectedNation={selectedNation} owner={owner} />
      </section>
    </>
  );
}
