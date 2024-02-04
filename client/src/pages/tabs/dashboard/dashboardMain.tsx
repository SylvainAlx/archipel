/* eslint-disable react-hooks/exhaustive-deps */
import H1 from "../../../components/titles/h1";
import { StringProps } from "../../../types/typProp";
import GeneralInformations from "../../../components/nations/dashboard/generalInformations";
import { selectedNationAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import PointsDistribution from "../../../components/nations/dashboard/pointsDistribution";
import { useEffect, useState } from "react";

export default function DashboardMain({ text }: StringProps) {
  const [selectedNation] = useAtom(selectedNationAtom);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const ownerToker = localStorage.getItem("owner");
    if (ownerToker) {
      setOwner(true);
    }
  }, []);

  return (
    <>
      <H1 text={text} />
      <section className="w-full flex flex-wrap gap-8 items-start justify-center">
        <GeneralInformations selectedNation={selectedNation} owner={owner} />
        <PointsDistribution selectedNation={selectedNation} owner={owner} />
      </section>
    </>
  );
}
