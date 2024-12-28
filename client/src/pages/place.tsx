import {
  comFetchedListAtom,
  editPlaceAtom,
  nationFetchedAtom,
  placeFetchedAtom,
  sessionAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNationPlaces, getPlace } from "../api/place/placeAPI";
import { getNation } from "../api/nation/nationAPI";
import ReportPanel from "../components/reportPanel";
import { getComsByDestination } from "../api/communication/comAPI";
import PlaceIdentity from "../components/place/placeIdentity";
import PlaceChildren from "../components/place/placeChildren";
import PlaceHeader from "../components/place/placeHeader";
import { displayUnwatchedComs } from "../utils/procedures";

export default function Place() {
  const [session] = useAtom(sessionAtom);
  const [nation] = useAtom(nationFetchedAtom);
  const [place] = useAtom(placeFetchedAtom);
  const [comList] = useAtom(comFetchedListAtom);
  const [, setEditPlace] = useAtom(editPlaceAtom);
  const param = useParams();

  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (param.id != undefined) {
      getPlace(param.id);
    }
  }, [param.id]);

  useEffect(() => {
    setEditPlace({ place });
    if (
      place.nation === session.user.citizenship.nationId &&
      session.user.citizenship.nationOwner
    ) {
      setOwner(true);
      getComsByDestination(place.officialId);
    }

    getNation(place.nation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  useEffect(() => {
    if (nation != null && nation != undefined && nation.officialId != "") {
      getNationPlaces(nation);
    }
  }, [nation]);

  useEffect(() => {
    if (
      owner &&
      comList.length > 0 &&
      comList[0].destination === place.officialId
    ) {
      displayUnwatchedComs(place.officialId, comList);
    }
  }, [comList]);

  return (
    <>
      <section className="w-full px-2 pb-2 flex flex-col items-center gap-2">
        <PlaceHeader place={place} nation={nation} owner={owner} />
        {!place.reported && <PlaceIdentity place={place} owner={owner} />}
      </section>
      <PlaceChildren place={place} nation={nation} owner={owner} />
      <ReportPanel content={place} />
    </>
  );
}
