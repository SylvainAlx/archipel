import { useTranslation } from "react-i18next";
import TileContainer from "../../tileContainer";
import DashTile from "../../dashTile";
import { lazy, Suspense, useEffect, useState } from "react";
import { getNationCitizens } from "../../../api/user/userAPI";
import { SelectedNationProps } from "../../../types/typProp";
import Spinner from "../../loading/spinner";
import { nationCitizenListAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import { User } from "../../../types/typUser";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const [nationCitizenList] = useAtom(nationCitizenListAtom);
  const [citizens, setCitizens] = useState<User[]>([]);
  const { t } = useTranslation();
  const CitizenTile = lazy(() => import("./citizenTile"));

  useEffect(() => {
    if (selectedNation.officialId !== "") {
      getNationCitizens(selectedNation.officialId);
    }
  }, [selectedNation.officialId]);

  useEffect(() => {
    const updatedCitizens: User[] = [];
    nationCitizenList.forEach((citizen) => {
      updatedCitizens.push(citizen);
    });
    setCitizens(updatedCitizens.sort());
  }, [nationCitizenList, selectedNation.officialId]);

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.citizens")}
          className="w-full my-2"
          children={
            <div className="w-full flex flex-col gap-2 items-center">
              {citizens.length > 0 ? (
                citizens.map((citizen, i) => {
                  return (
                    <Suspense key={i} fallback={<Spinner />}>
                      <div className="relative w-full">
                        <CitizenTile citizen={citizen} />
                      </div>
                    </Suspense>
                  );
                })
              ) : (
                <em className="text-center">
                  {t("pages.nation.simulation.noCitizens")}
                </em>
              )}
            </div>
          }
        />
      }
    />
  );
}
