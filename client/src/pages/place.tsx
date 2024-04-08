import { editPlaceAtom, nationPlacesListAtom } from "../settings/store";
import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import { Suspense, lazy, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlace } from "../api/place/placeAPI";
import IdTag from "../components/tags/idTag";
import DashTile from "../components/dashTile";
import EyeButton from "../components/buttons/eyeButton";
import PlaceTag from "../components/tags/placeTag";
import { getPlaceTypeLabel } from "../utils/functions";
import NewPlaceButton from "../components/buttons/newPlaceButton";
import IndexTag from "../components/tags/indexTag";
import Spinner from "../components/loading/spinner";
import EditIcon from "../components/editIcon";

export default function Place() {
  const { paramId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useAtom(editPlaceAtom);
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const PlaceTile = lazy(
    () => import("../components/nations/dashboard/placeTile"),
  );

  useEffect(() => {
    if (data.place.officialId != paramId && paramId != undefined) {
      getPlace(paramId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (data.place.nation === data.place.parentId) {
      navigate(`/nation/${data.place.nation}`);
    } else {
      nationPlacesList.forEach((place) => {
        if (place.officialId === data.place.parentId) {
          setData({ ...data, place });
        }
      });
      navigate(`/place/${data.place.parentId}`);
    }
  };

  return (
    <>
      <H1 text={data.place.name} />
      {data.owner && (
        <EditIcon target="place" param={data.place.name} path="name" />
      )}
      <div className="flex items-center justify-center flex-wrap gap-1">
        {data.place.officialId && <IdTag label={data.place.officialId} />}
        <PlaceTag label={getPlaceTypeLabel(data.place.type)} />
        <EyeButton text="voir le lieu parent" click={handleClick} />
      </div>
      <section className="w-full flex flex-wrap justify-center gap-2">
        {data.place.type === 2 ? (
          data.place.builds.map((placeCategory, i) => {
            return (
              <div key={i}>
                <DashTile
                  title={placeCategory.label.fr}
                  children={
                    <div className="flex flex-col items-center justify-center gap-2">
                      {placeCategory.builds.map((build, j) => {
                        return (
                          <div
                            className="flex flex-col items-center justify-center"
                            key={j}
                          >
                            {build.label.fr}
                          </div>
                        );
                      })}
                    </div>
                  }
                />
              </div>
            );
          })
        ) : (
          <>
            <div className="w-full flex flex-col gap-2">
              {nationPlacesList != undefined ? (
                nationPlacesList.map((place, i) => {
                  if (place.parentId === data.place.officialId) {
                    return (
                      <Suspense key={i} fallback={<Spinner />}>
                        <div className="relative w-full">
                          <PlaceTile owner={data.owner} place={place} />
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
            {data.owner && (
              <NewPlaceButton
                parentId={data.place.officialId}
                owner={data.owner}
              />
            )}
          </>
        )}
      </section>
    </>
  );
}
