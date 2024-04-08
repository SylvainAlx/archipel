import { Suspense, lazy, useEffect } from "react";
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
import IndexTag from "../../tags/indexTag";
import NewPlaceButton from "../../buttons/newPlaceButton";

export default function Roleplay({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const PlaceTile = lazy(
    () => import("../../../components/nations/dashboard/placeTile"),
  );

  useEffect(() => {
    if (selectedNation.officialId !== "" && nationPlacesList.length === 0) {
      getNationPlaces(selectedNation.officialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TileContainer
      children={
        <>
          <H2 text="Simulation" />
          <DashTile
            title="Score"
            className="w-full"
            children={
              <>
                <div className="w-full px-2 flex items-center justify-center gap-1">
                  <PointTag label={selectedNation.data.roleplay.points} />
                  <PopulationTag
                    label={selectedNation.data.roleplay.population}
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
            title="Lieux"
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
                              <IndexTag text={i} />
                            </div>
                          </Suspense>
                        );
                      }
                    })
                  ) : (
                    <em className="text-center">Aucun lieu</em>
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
          <DashTile title="Diplomatie" className="w-full" children={<></>} />
          <DashTile title="Citoyens" className="w-full" children={<></>} />
        </>
      }
    />
  );
}
