import { confirmBox, myStore, sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReportPanel from "../components/reportPanel";
import { PlaceModel } from "../models/placeModel";
import { useTranslation } from "react-i18next";
import { NationModel } from "../models/nationModel";
import { createPageTitle } from "../utils/procedures";
import MapSkeleton from "../components/loading/skeletons/mapSkeleton";
import TileSkeleton from "../components/loading/skeletons/tileSkeleton";
import ParamSkeleton from "../components/loading/skeletons/paramSkeleton";
import { useLoadNationPlaces } from "../hooks/useLoadNationPlaces";

export default function Place() {
  const [session] = useAtom(sessionAtom);
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [place, setPlace] = useState<PlaceModel>(new PlaceModel());
  const nationPlaceList = useLoadNationPlaces(nation);
  const param = useParams();

  createPageTitle(place.name);

  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();

  const PlaceHeader = lazy(() => import("../components/place/placeHeader"));
  const PlaceIdentity = lazy(() => import("../components/place/placeIdentity"));
  const PlaceChildren = lazy(() => import("../components/place/placeChildren"));

  useEffect(() => {
    const loadPlace = async () => {
      if (param.id) {
        const updatedPlace = await place.loadPlace(param.id);
        updatedPlace && setPlace(updatedPlace);
      }
    };
    loadPlace();
  }, [param.id]);

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      const loadedNation = await nation.loadNation(officialId);
      setNation(loadedNation);
    };
    if (
      place.nation === session.user.citizenship.nationId &&
      session.user.citizenship.nationOwner
    ) {
      setOwner(true);
    }
    if (nation.officialId === "" && place.nation != "") {
      loadNation(place.nation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  const updatePath = (
    path: string,
    value: string,
    needConfirm: boolean = true,
  ) => {
    const updatedPlace = place.updateOne(path, value);

    const baseUpdate = async () => {
      const placeInBase = await updatedPlace.updatedObject.baseUpdate();
      setPlace(placeInBase);
    };
    if (updatedPlace.isSuccess) {
      if (needConfirm) {
        myStore.set(confirmBox, {
          text: t("components.modals.confirmModal.updatePlace"),
          actionToDo: baseUpdate,
        });
      } else {
        baseUpdate();
      }
    }
  };

  return (
    <>
      <section className="w-full px-2 pb-2 flex flex-col items-center gap-2">
        <Suspense fallback={<ParamSkeleton />}>
          <PlaceHeader
            place={place}
            nation={nation}
            owner={owner}
            updatePath={updatePath}
          />
        </Suspense>
        {!place.reported && (
          <Suspense fallback={<MapSkeleton />}>
            <PlaceIdentity
              place={place}
              owner={owner}
              updatePath={updatePath}
            />
          </Suspense>
        )}
      </section>
      <Suspense fallback={<TileSkeleton />}>
        <PlaceChildren
          place={place}
          nation={nation}
          owner={owner}
          nationPlaceList={nationPlaceList}
        />
      </Suspense>
      <ReportPanel content={place} />
    </>
  );
}
