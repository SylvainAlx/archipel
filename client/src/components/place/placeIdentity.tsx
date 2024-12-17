import { lazy, Suspense } from "react";
import { Place } from "../../types/typPlace";
import EditIcon from "../editIcon";
import H2 from "../titles/h2";
import Spinner from "../loading/spinner";
import CrossButton from "../buttons/crossButton";
import { AiOutlinePicture } from "react-icons/ai";
import Upploader from "../uploader";
import IdTag from "../tags/idTag";
import PlaceTag from "../tags/placeTag";
import { getPlaceTypeLabel, handleDeleteImage } from "../../utils/functions";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";

interface PlaceIdentityProps {
  place: Place;
  owner: boolean;
}

export default function PlaceIdentity({ place, owner }: PlaceIdentityProps) {
  const LazyImage = lazy(() => import("../lazy/lazyImage"));
  const { t } = useTranslation();
  return (
    <section className="w-full flex flex-col items-center rounded gap-4">
      <div className="flex items-center gap-2">
        <H2 text={`${place.name}`} />
        {owner && <EditIcon target="place" param={place.name} path="name" />}
      </div>
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
      <div className="flex items-center justify-center flex-wrap gap-1">
        {place.officialId && <IdTag label={place.officialId} />}
        <PlaceTag label={getPlaceTypeLabel(place.type)} />
        {/* <PopulationTag label={getTotalPopulation(place)} /> */}
      </div>
      <div className="flex items-center gap-2">
        {place.description != "" ? (
          <MDEditor.Markdown
            className="bg-transparent text-light text-justify"
            source={place.description}
            style={{ whiteSpace: "pre-wrap" }}
          />
        ) : (
          <em className="text-center">{t("pages.place.noDescription")}</em>
        )}
        {owner && (
          <EditIcon
            target="place"
            param={place.description}
            path="description"
          />
        )}
      </div>
    </section>
  );
}
