import {
  confirmBox,
  nationFetchedAtom,
  nationPlacesListAtom,
  placeFetchedAtom,
  sessionAtom,
} from "../settings/store";
import { useAtom } from "jotai";
import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNationPlaces, getPlace } from "../api/place/placeAPI";
import IdTag from "../components/tags/idTag";
import PlaceTag from "../components/tags/placeTag";
import {
  getPlaceListByType,
  getPlaceName,
  getPlaceTypeLabel,
  getTotalPopulation,
  handleDeleteImage,
} from "../utils/functions";
import NewPlaceButton from "../components/buttons/newPlaceButton";
import Spinner from "../components/loading/spinner";
import EditIcon from "../components/editIcon";
import H2 from "../components/titles/h2";
import ParentButton from "../components/buttons/parentButton";
import { useTranslation } from "react-i18next";
import { getNation } from "../api/nation/nationAPI";
import CrossButton from "../components/buttons/crossButton";
import Upploader from "../components/uploader";
import { AiOutlinePicture } from "react-icons/ai";
import { ConfirmBoxDefault } from "../types/typAtom";
import MDEditor from "@uiw/react-md-editor";
import PopulationTag from "../components/tags/populationTag";

export default function Place() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [session] = useAtom(sessionAtom);
  const [nation] = useAtom(nationFetchedAtom);
  const [place] = useAtom(placeFetchedAtom);
  const [nationPlacesList] = useAtom(nationPlacesListAtom);
  const [confirm, setConfirm] = useAtom(confirmBox);
  const param = useParams();
  const [refresh, setRefresh] = useState(false);
  const [haveChildren, setHaveChildren] = useState(false);
  const [parentName, setParentName] = useState("");
  const [owner, setOwner] = useState(false);
  const PlaceTile = lazy(() => import("../components/tiles/placeTile"));
  const LazyImage = lazy(() => import("../components/lazy/lazyImage"));

  useEffect(() => {
    if (param.id != undefined) {
      getPlace(param.id);
    }
  }, [param.id]);

  useEffect(() => {
    if (
      place.nation === session.user.citizenship.nationId &&
      session.user.citizenship.nationOwner
    ) {
      setOwner(true);
    }
    if (
      place.nation != undefined &&
      place.nation != "" &&
      nation.officialId === ""
    ) {
      getNation(place.nation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  useEffect(() => {
    if (nation != null && nation != undefined && nation.officialId != "") {
      getNationPlaces(nation);
    }
  }, [nation]);

  useEffect(() => {
    if (nationPlacesList != undefined) {
      setParentName(
        getPlaceName(nationPlacesList, place.parentId, nation.name),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationPlacesList, place, nation]);

  useEffect(() => {
    if (confirm.action === "deletePlace" && confirm.result === "OK") {
      navigate(`/nation/${place.nation}`);
      setConfirm(ConfirmBoxDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  const handleClick = () => {
    if (place.nation === place.parentId) {
      navigate(`/nation/${place.nation}`);
    } else {
      nationPlacesList.forEach((loc) => {
        if (loc.officialId === place.parentId) {
          navigate(`/place/${loc.officialId}`);
          setRefresh(!refresh);
        }
      });
    }
  };

  const handleDelete = () => {
    setConfirm({
      action: "deletePlace",
      text: t("components.modals.confirmModal.deletePlace"),
      result: "",
      target: place,
    });
  };

  return (
    <>
      <section className="w-full px-2 pb-2 flex flex-col items-center gap-2">
        <div className="w-full flex items-center justify-center flex-wrap gap-1">
          <ParentButton click={handleClick} />
          {owner && <CrossButton click={handleDelete} />}
        </div>
        <div className="flex items-center gap-2">
          <b>{`${nation.name != parentName ? nation.name + " > " + parentName : nation.name}`}</b>
          {owner && (
            <EditIcon
              target="place"
              param={getPlaceListByType(nation, nationPlacesList, [0, 1])}
              path="parentId"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <H2 text={`${place.name}`} />
          {owner && <EditIcon target="place" param={place.name} path="name" />}
        </div>

        <section className="w-full flex flex-col items-center rounded">
          {place.image != undefined && place.image != "" ? (
            <div className="relative max-w-[800px]">
              <Suspense fallback={<Spinner />}>
                <LazyImage
                  src={place.image}
                  alt={`image of ${place.name}`}
                  className="object-contain w-full h-full rounded cursor-zoom-in"
                  hover={t("pages.place.image")}
                />
              </Suspense>
              {owner && (
                <CrossButton
                  small={true}
                  click={() =>
                    handleDeleteImage({
                      url: place.image,
                      type: "placeImage",
                    })
                  }
                />
              )}
            </div>
          ) : (
            <>
              <AiOutlinePicture className="text-9xl" />
              {owner && (
                <Upploader
                  path="image"
                  destination="place"
                  place={place}
                  maxSize={2000000}
                />
              )}
              <em>{t("pages.place.noImage")}</em>
            </>
          )}
        </section>

        <div className="flex items-center justify-center flex-wrap gap-1">
          {place.officialId && <IdTag label={place.officialId} />}
          <PlaceTag label={getPlaceTypeLabel(place.type)} />
          <PopulationTag label={getTotalPopulation(place)} />
        </div>
        <div className="flex items-center gap-2">
          <MDEditor.Markdown
            className="bg-transparent text-light text-justify"
            source={place.description}
            style={{ whiteSpace: "pre-wrap" }}
          />
          {owner && (
            <EditIcon
              target="place"
              param={place.description}
              path="description"
            />
          )}
        </div>
      </section>
      <section className="w-full px-2 flex flex-wrap justify-center gap-2">
        <div className="w-full py-4 flex flex-col gap-2">
          {nationPlacesList != undefined &&
            nationPlacesList.length > 0 &&
            nationPlacesList.map((loc, i) => {
              if (loc.parentId === place.officialId) {
                !haveChildren && setHaveChildren(true);
                return (
                  <Suspense key={i} fallback={<Spinner />}>
                    <div className="relative w-full">
                      <PlaceTile owner={false} place={loc} />
                    </div>
                  </Suspense>
                );
              }
            })}
          {!haveChildren && (
            <em className="text-center">{t("pages.place.noChildrenPlaces")}</em>
          )}
        </div>
        {owner && place.type != 2 && (
          <NewPlaceButton
            nation={nation}
            parentId={place.officialId}
            owner={owner}
          />
        )}
      </section>
    </>
  );
}
