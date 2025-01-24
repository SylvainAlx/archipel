import {
  confirmBox,
  myStore,
  nationPlaceListAtomV2,
  placeListAtomV2,
  sessionAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReportPanel from "../components/reportPanel";
import PlaceIdentity from "../components/place/placeIdentity";
import PlaceChildren from "../components/place/placeChildren";
import PlaceHeader from "../components/place/placeHeader";
import { getDocumentTitle } from "../utils/functions";
import { PlaceModel } from "../models/placeModel";
import { useTranslation } from "react-i18next";
import { NationModel } from "../models/nationModel";

export default function Place() {
  const [session] = useAtom(sessionAtom);
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const [place, setPlace] = useState<PlaceModel>(new PlaceModel());
  const [placeList] = useAtom(placeListAtomV2);
  const [nationPlaceList, setNationPlacesList] = useAtom(nationPlaceListAtomV2);
  const param = useParams();

  const [owner, setOwner] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    console.log(placeList);
  }, [placeList]);

  useEffect(() => {
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

    loadNation(place.nation);

    document.title = getDocumentTitle(place.name);
    return () => {
      document.title = getDocumentTitle("");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  useEffect(() => {
    if (nation != null && nation != undefined && nation.officialId != "") {
      loadNationPlaces();
    }
  }, [nation]);

  const loadPlace = async () => {
    if (param.id != undefined) {
      const updatedPlace = await place.loadPlace(param.id);
      updatedPlace && setPlace(updatedPlace);
    }
  };

  const loadNationPlaces = async () => {
    const updatedList = await nationPlaceList.loadNationPlaces(nation);
    updatedList && setNationPlacesList(updatedList);
  };

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
          action: "updatePlace",
          text: t("components.modals.confirmModal.updatePlace"),
          result: "",
          target: "",
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
        <PlaceHeader
          place={place}
          nation={nation}
          owner={owner}
          updatePath={updatePath}
        />
        {!place.reported && (
          <PlaceIdentity place={place} owner={owner} updatePath={updatePath} />
        )}
      </section>
      <PlaceChildren place={place} nation={nation} owner={owner} />
      <ReportPanel content={place} />
    </>
  );
}
