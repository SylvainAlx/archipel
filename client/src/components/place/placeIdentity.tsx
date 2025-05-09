import { lazy, Suspense } from "react";
import EditButton from "../ui/buttons/editButton";
import H2 from "../ui/titles/h2";
import Spinner from "../ui/loading/spinner";
import CrossButton from "../ui/buttons/crossButton";
import { AiOutlinePicture } from "react-icons/ai";
import Upploader from "../ui/uploader";
import IdTag from "../ui/tags/idTag";
import PlaceTag from "../ui/tags/placeTag";
import MDEditor from "@uiw/react-md-editor";
import { PlaceModel } from "../../models/placeModel";
import { PLACE_TYPE } from "../../settings/consts";
import PopulationTag from "../ui/tags/populationTag";
import usePlaceIdentity from "../../hooks/componentsHooks/place/usePlaceIdentity";

interface PlaceIdentityProps {
  place: PlaceModel;
  owner: boolean;
  updatePath: (path: string, value: string, needConfirm?: boolean) => void;
}

export default function PlaceIdentity({
  place,
  owner,
  updatePath,
}: PlaceIdentityProps) {
  const LazyImage = lazy(() => import("../ui/lazy/lazyImage"));
  const { handleDeleteImage, t } = usePlaceIdentity(place, updatePath);

  return (
    <section className="w-full flex flex-col items-center rounded gap-4">
      <div className="flex items-center gap-2">
        <H2 text={`${place.name}`} />
        {owner && (
          <EditButton
            editBox={{
              target: "place",
              original: place.name,
              new: place.name,
              path: "name",
              action: updatePath,
              canBeEmpty: false,
            }}
          />
        )}
      </div>
      {place.image != undefined && place.image != "" ? (
        <div className="relative max-w-3xl">
          <Suspense fallback={<Spinner />}>
            <LazyImage
              src={place.image}
              alt={`image of ${place.name}`}
              className="object-contain w-full h-full rounded cursor-zoom-in"
              hover={t("pages.place.image")}
            />
          </Suspense>
          {owner && <CrossButton small={true} click={handleDeleteImage} />}
        </div>
      ) : (
        <>
          <AiOutlinePicture className="text-9xl" />
          {owner && (
            <Upploader path="image" updatePath={updatePath} maxSize={2000000} />
          )}
          <em>{t("pages.place.noImage")}</em>
        </>
      )}
      <div className="flex items-center justify-center flex-wrap gap-1">
        {place.officialId && <IdTag label={place.officialId} />}
        <PlaceTag label={place.getPlaceTypeLabel()} />
        {place.type === PLACE_TYPE.city.id && (
          <PopulationTag label={place.population} />
        )}
      </div>
      <div className="w-full max-w-3xl flex items-center gap-2 justify-center">
        {place.description != "" ? (
          <MDEditor.Markdown
            className="bg-transparent text-light text-justify mde-markdown"
            source={place.description}
          />
        ) : (
          <em className="text-center">{t("pages.place.noDescription")}</em>
        )}
        {owner && (
          <EditButton
            editBox={{
              target: "place",
              original: place.description,
              new: place.description,
              path: "description",
              action: updatePath,
            }}
          />
        )}
      </div>
    </section>
  );
}
