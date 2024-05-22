import { useTranslation } from "react-i18next";
import TileContainer from "../../tileContainer";
import DashTile from "../../dashTile";
// import DevFlag from "../../devFlag";
import { useAtom } from "jotai";
import { nationCitizenListAtom } from "../../../settings/store";
import { lazy, Suspense, useEffect, useState } from "react";
import { getNationCitizens } from "../../../api/user/userAPI";
import { SelectedNationProps } from "../../../types/typProp";
import Spinner from "../../loading/spinner";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const [nationCitizenList] = useAtom(nationCitizenListAtom);
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  const CitizenTile = lazy(() => import("./citizenTile"));

  useEffect(() => {
    if (
      selectedNation.officialId !== "" &&
      nationCitizenList.length === 0 &&
      !checked
    ) {
      getNationCitizens(selectedNation.officialId);
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationCitizenList, selectedNation.officialId]);

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.citizens")}
          className="w-full my-2"
          children={
            <div className="w-full flex flex-col gap-2 items-center">
              {nationCitizenList != undefined ? (
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
                  {/* {t("pages.nation.simulation.noPlaces")} */}
                </em>
              )}
            </div>
          }
        />
      }
    />
  );
}
