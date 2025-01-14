import { lazy, Suspense } from "react";
import { SelectedNationProps } from "../../types/typProp";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import Upploader from "../uploader";
import Spinner from "../loading/spinner";
import CrossButton from "../buttons/crossButton";
import { useTranslation } from "react-i18next";
import { FaMapLocationDot } from "react-icons/fa6";
import { handleDeleteImage } from "../../utils/procedures";

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
          title={t("pages.nation.map.title")}
          children={
            <section className="w-full flex flex-col items-center rounded">
              {selectedNation.data.url.map != undefined &&
              selectedNation.data.url.map != "" ? (
                <div className="relative w-full max-w-[600px]">
                  <Suspense fallback={<Spinner />}>
                    <LazyImage
                      src={selectedNation.data.url.map}
                      alt={`map of ${selectedNation.name}`}
                      className="object-contain w-full h-full rounded cursor-zoom-in"
                      hover={t("pages.nation.map.title")}
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
                  <FaMapLocationDot className="text-9xl" />
                  {owner && (
                    <Upploader
                      path="data.url.map"
                      destination="nation"
                      maxSize={2000000}
                    />
                  )}
                  <em>{t("pages.nation.map.noMap")}</em>
                </>
              )}
            </section>
          }
        />
      }
    />
  );
}
