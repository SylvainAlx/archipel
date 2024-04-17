import { Suspense, lazy, useEffect, useState } from "react";
import { SelectedNationProps } from "../../../types/typProp";
import DashTile from "../../dashTile";
import TileContainer from "../../tileContainer";
import H2 from "../../titles/h2";
import { nationPlacesListAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import PointTag from "../../tags/pointTag";
import CreditTag from "../../tags/creditTag";
import PopulationTag from "../../tags/populationTag";
import { getNationPlaces } from "../../../api/place/placeAPI";
import Spinner from "../../loading/spinner";
import NewPlaceButton from "../../buttons/newPlaceButton";
import DevFlag from "../../devFlag";
import { useTranslation } from "react-i18next";
import PlaceTag from "../../tags/placeTag";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [checked, setChecked] = useState(false);
  const PlaceTile = lazy(
    () => import("../../../components/nations/dashboard/placeTile"),
  );

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
        <>
          <H2 text={t("pages.dashboard.tabs.dashboard.simulation.title")} />
          <DashTile
            title={t("pages.dashboard.tabs.dashboard.simulation.score")}
            className="w-full"
            children={
              <>
                <div className="w-full px-2 flex items-center justify-center gap-1">
                  <PointTag label={selectedNation.data.roleplay.points} />
                  <PlaceTag label={selectedNation.data.roleplay.places} />
                  <PopulationTag
                    label={selectedNation.data.roleplay.citizens}
                  />
                  <CreditTag
                    label={selectedNation.data.roleplay.credits}
                    owner={owner}
                  />
                </div>
              </>
            }
          />

          <DashTile
            title={t("pages.dashboard.tabs.dashboard.simulation.places")}
            children={
              <>
                <div className="w-full flex flex-col gap-2">
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
                      {t("pages.dashboard.tabs.dashboard.simulation.noPlaces")}
                    </em>
                  )}
                </div>
                {owner && (
                  <NewPlaceButton
                    owner={owner}
                    parentId={selectedNation.officialId}
                  />
                )}
              </>
            }
          />
          <DashTile
            title={t("pages.dashboard.tabs.dashboard.simulation.diplomacy")}
            className="w-full"
            children={
              <>
                <DevFlag />
              </>
            }
          />
        </>
      }
    />
  );
}
