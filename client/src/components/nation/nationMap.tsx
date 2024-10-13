import { lazy, Suspense } from "react";
import { SelectedNationProps } from "../../types/typProp";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import Upploader from "../uploader";
import Spinner from "../loading/spinner";
import CrossButton from "../buttons/crossButton";
import { handleDeleteImage } from "../../utils/functions";
import { useTranslation } from "react-i18next";

export default function NationMap({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();

  const LazyImage = lazy(() => import("../lazy/lazyImage"));

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.simulation.map")}
          children={
            <section className="w-full flex flex-col items-center rounded">
              {selectedNation.data.url.map != undefined &&
              selectedNation.data.url.map != "" ? (
                <div className="relative w-full">
                  <Suspense fallback={<Spinner />}>
                    <LazyImage
                      src={selectedNation.data.url.map}
                      alt={`map of ${selectedNation.name}`}
                      className="object-contain w-full h-full rounded cursor-zoom-in"
                      hover={t("pages.nation.simulation.map")}
                    />
                  </Suspense>
                  {owner && (
                    <CrossButton
                      small={true}
                      click={() =>
                        handleDeleteImage({
                          url: selectedNation.data.url.map,
                          type: "map",
                        })
                      }
                    />
                  )}
                </div>
              ) : (
                <>
                  <div className="w-full max-w-[300px]">
                    <img
                      className="object-cover w-full h-full opacity-20"
                      src="/emptyMap.webp"
                      alt="empty map"
                    ></img>
                  </div>
                  {owner && (
                    <Upploader path="data.url.map" destination="nation" />
                  )}
                </>
              )}
            </section>
          }
        />
      }
    />
  );
}
