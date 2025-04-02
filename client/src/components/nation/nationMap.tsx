import { lazy, Suspense } from "react";
import DashTile from "../ui/dashTile";
import TileContainer from "../ui/tileContainer";
import Spinner from "../ui/loading/spinner";
import CrossButton from "../ui/buttons/crossButton";
import { FaMapLocationDot } from "react-icons/fa6";
import { NationModel } from "../../models/nationModel";
import Upploader from "../ui/uploader";
import useNationMap from "../../hooks/componentsHooks/nation/useNationMap";

interface NationMapProps {
  selectedNation: NationModel;
  owner: boolean;
  updatePath: (path: string, value: string, needConfirm?: boolean) => void;
}
export default function NationMap({
  selectedNation,
  owner,
  updatePath,
}: NationMapProps) {
  const { handleDeleteImage, t } = useNationMap(selectedNation, updatePath);
  const LazyImage = lazy(() => import("../ui/lazy/lazyImage"));

  return (
    <TileContainer>
      <DashTile title={t("pages.nation.map.title")}>
        <section className="w-full flex flex-col items-center rounded">
          {selectedNation.data.url.map != undefined &&
          selectedNation.data.url.map != "" ? (
            <div className="relative w-full max-w-2xl">
              <Suspense fallback={<Spinner />}>
                <LazyImage
                  src={selectedNation.data.url.map}
                  alt={`map of ${selectedNation.name}`}
                  className="object-contain w-full h-full rounded cursor-zoom-in"
                  hover={t("pages.nation.map.title")}
                />
              </Suspense>
              {owner && <CrossButton small={true} click={handleDeleteImage} />}
            </div>
          ) : (
            <>
              <FaMapLocationDot className="text-9xl" />
              {owner && (
                <Upploader
                  path="data.url.map"
                  updatePath={updatePath}
                  maxSize={2000000}
                />
              )}
              <em>{t("pages.nation.map.noMap")}</em>
            </>
          )}
        </section>
      </DashTile>
    </TileContainer>
  );
}
