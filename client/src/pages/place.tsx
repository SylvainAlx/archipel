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
import DevFlag from "../components/devFlag";
import { useTranslation } from "react-i18next";
import TreeTag from "../components/tags/treeTag";

export default function Place() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [data, setData] = useAtom(editPlaceAtom);
  const [selectedNation] = useAtom(selectedNationAtom);
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [refresh, setRefresh] = useState(false);
  const [haveChildren, setHaveChildren] = useState(false);
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
            <TreeTag
              label={getPlaceName(
                nationPlacesList,
                data.place.parentId,
                selectedNation.name,
              )}
            />

            {data.owner && (
              <EditIcon
                target="place"
                param={getPlaceListByType(
                  selectedNation,
                  nationPlacesList,
                  [0, 1],
                )}
                path="parentId"
              />
            )}
          </div>

          <PlaceTag label={getPlaceTypeLabel(data.place.type)} />
        </div>
      </section>
      <section className="w-full flex flex-wrap justify-center gap-2">
        <div className="w-full py-4 flex flex-col gap-2">
          {nationPlacesList != undefined &&
            nationPlacesList.length > 0 &&
            nationPlacesList.map((place, i) => {
              if (place.parentId === data.place.officialId) {
                !haveChildren && setHaveChildren(true);
                return (
                  <Suspense key={i} fallback={<Spinner />}>
                    <div className="relative w-full">
                      <PlaceTile owner={data.owner} place={place} />
                    </div>
                  </Suspense>
                );
              }
            })}
          {!haveChildren && (
            <em className="text-center">
              {t("pages.dashboard.tabs.dashboard.simulation.noPlaces")}
            </em>
          )}
        </div>
        {data.owner && data.place.type != 2 && (
          <NewPlaceButton parentId={data.place.officialId} owner={data.owner} />
        )}
        {/* </>
        )} */}
      </section>
      {data.place.type === 2 && (
        <DashTile
          title={t("pages.dashboard.tabs.dashboard.simulation.citizens")}
          className="w-full my-2"
          children={
            <>
              <DevFlag />
            </>
          }
        />
      )}
    </>
  );
}
