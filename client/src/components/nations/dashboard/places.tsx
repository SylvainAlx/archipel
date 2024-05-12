import { Suspense, lazy, useEffect, useState } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import { nationPlacesListAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import { getNationPlaces } from "../../../api/place/placeAPI";
import Spinner from "../../loading/spinner";
import NewPlaceButton from "../../buttons/newPlaceButton";
import { useTranslation } from "react-i18next";
import DashTile from "../../dashTile";

export default function Places({ selectedNation, owner }: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [checked, setChecked] = useState(false);
  const PlaceTile = lazy(() => import("./placeTile"));

  useEffect(() => {
    if (
      selectedNation.officialId !== "" &&
      nationPlacesList.length === 0 &&
      !checked
    ) {
      getNationPlaces(selectedNation.officialId);
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationPlacesList]);

  return (
    <TileContainer
      children={
        <section className="flex flex-col items-center gap-4">
          <H2 text={t("pages.nation.simulation.places")} />
          <DashTile
            title=""
            className="w-full min-w-[300px] flex-grow"
            children={
              <div className="w-full flex flex-col gap-2 items-center">
                {nationPlacesList != undefined ? (
                  nationPlacesList.map((place, i) => {
                    if (place.parentId === selectedNation.officialId) {
                      return (
                        <Suspense key={i} fallback={<Spinner />}>
                          <div className="relative w-full">
                            <PlaceTile owner={owner} place={place} />
                          </div>
                        </Suspense>
                      );
                    }
                  })
                ) : (
                  <em className="text-center">
                    {t("pages.nation.simulation.noPlaces")}
                  </em>
                )}
                {owner && (
                  <NewPlaceButton
                    owner={owner}
                    parentId={selectedNation.officialId}
                  />
                )}
              </div>
            }
          />
        </section>
      }
    />
  );
}
