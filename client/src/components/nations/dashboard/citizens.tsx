import { useTranslation } from "react-i18next";
import TileContainer from "../../tileContainer";
import DashTile from "../../dashTile";
import { lazy, Suspense, useEffect } from "react";
import { getNationCitizens } from "../../../api/user/userAPI";
import { SelectedNationProps } from "../../../types/typProp";
import Spinner from "../../loading/spinner";
import { nationCitizenListAtom } from "../../../settings/store";
import { useAtom } from "jotai";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const [nationCitizenList] = useAtom(nationCitizenListAtom);
  const { t } = useTranslation();
  const CitizenTile = lazy(() => import("./citizenTile"));

  useEffect(() => {
    getNationCitizens(selectedNation.officialId);
  }, [selectedNation.officialId]);

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.citizens")}
          className="w-full my-2"
          children={
            <div className="w-full flex flex-col gap-2 items-center">
              {nationCitizenList.length > 0 ? (
                nationCitizenList.map((citizen, i) => {
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
