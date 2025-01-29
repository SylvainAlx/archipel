import { confirmBox, myStore, sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReportPanel from "../components/reportPanel";
import { getDocumentTitle } from "../utils/functions";
import { PlaceModel } from "../models/placeModel";
import { useTranslation } from "react-i18next";
import { NationModel } from "../models/nationModel";
import Spinner from "../components/loading/spinner";

export default function Place() {
  const [session] = useAtom(sessionAtom);
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [place, setPlace] = useState<PlaceModel>(new PlaceModel());
  const param = useParams();

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
    if (nation.officialId === "") {
      loadNation(place.nation);
    }

    document.title = getDocumentTitle(place.name);
    return () => {
      document.title = getDocumentTitle("");
    };

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
          action: "",
          text: t("components.modals.confirmModal.updatePlace"),
          result: "",
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
        <Suspense fallback={<Spinner />}>
          <PlaceHeader
            place={place}
            nation={nation}
            owner={owner}
            updatePath={updatePath}
          />
        </Suspense>
        {!place.reported && (
          <Suspense fallback={<Spinner />}>
            <PlaceIdentity
              place={place}
              owner={owner}
              updatePath={updatePath}
            />
          </Suspense>
        )}
      </section>
      <Suspense fallback={<Spinner />}>
        <PlaceChildren place={place} nation={nation} owner={owner} />
      </Suspense>
      <ReportPanel content={place} />
    </>
  );
}
