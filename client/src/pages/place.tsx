import {
  editPlaceAtom,
  nationPlacesListAtom,
  selectedNationAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPlace } from "../api/place/placeAPI";
import IdTag from "../components/tags/idTag";
import DashTile from "../components/dashTile";
import PlaceTag from "../components/tags/placeTag";
import {
  getPlaceListByType,
  getPlaceName,
  getPlaceTypeLabel,
} from "../utils/functions";
import NewPlaceButton from "../components/buttons/newPlaceButton";
import Spinner from "../components/loading/spinner";
import EditIcon from "../components/editIcon";
import H2 from "../components/titles/h2";
import ParentButton from "../components/buttons/parentButton";
import Tag from "../components/tags/tag";
import { MdLandscape } from "react-icons/md";

export default function Place() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useAtom(editPlaceAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [refresh, setRefresh] = useState(false);
  const PlaceTile = lazy(
    () => import("../components/nations/dashboard/placeTile"),
  );

  useEffect(() => {
    const param = location.pathname.split("/");
    const id = param[param.length - 1];
    if (data.place.officialId != id && id != undefined) {
      let Ok = false;
      nationPlacesList.forEach((place) => {
        if (place.officialId === data.place.parentId) {
          Ok = true;
          setData({ ...data, place });
        }
      });
      if (!Ok) {
        getPlace(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, nationPlacesList]);

  const handleClick = () => {
    if (data.place.nation === data.place.parentId) {
      navigate(`/nation/${data.place.nation}`);
    } else {
      nationPlacesList.forEach((place) => {
        if (place.officialId === data.place.parentId) {
          navigate(`/place/${place.officialId}`);
          setRefresh(!refresh);
          // setData({ ...data, place });
        }
      });
    }
  };

  return (
    <>
      <section className="w-full pb-2 flex flex-col items-center gap-2">
        <ParentButton click={handleClick} />
        <div className="flex items-center gap-2">
          <H2 text={data.place.name} />
          {data.owner && (
            <EditIcon target="place" param={data.place.name} path="name" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <p>{data.place.description}</p>
          {data.owner && (
            <EditIcon
              target="place"
              param={data.place.description}
              path="description"
            />
          )}
        </div>
        <div className="flex items-center justify-center flex-wrap gap-1">
          {data.place.officialId && <IdTag label={data.place.officialId} />}

          <div className="flex items-center gap-2">
            <Tag
              text={getPlaceName(
                nationPlacesList,
                data.place.parentId,
                selectedNation.name,
              )}
              bgColor="bg-info"
              children={<MdLandscape />}
            />

            {data.owner && (
              <EditIcon
                target="place"
                param={getPlaceListByType(nationPlacesList, [0, 1])}
                path="parentId"
              />
            )}
          </div>

          <PlaceTag label={getPlaceTypeLabel(data.place.type)} />
        </div>
      </section>
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
            <div className="w-full py-4 flex flex-col gap-2">
              {nationPlacesList != undefined ? (
                nationPlacesList.map((place, i) => {
                  if (place.parentId === data.place.officialId) {
                    return (
                      <Suspense key={i} fallback={<Spinner />}>
                        <div className="relative w-full">
                          <PlaceTile owner={data.owner} place={place} />
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
