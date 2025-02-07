import { lazy, Suspense } from "react";
import DashTile from "../dashTile";
import TileContainer from "../tileContainer";
import Upploader from "../uploader";
import Spinner from "../loading/spinner";
import CrossButton from "../buttons/crossButton";
import { useTranslation } from "react-i18next";
import { FaMapLocationDot } from "react-icons/fa6";
import { deleteImage } from "../../utils/procedures";
import { NationModel } from "../../models/nationModel";
import { confirmBox, myStore } from "../../settings/store";

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
  const { t } = useTranslation();

  const LazyImage = lazy(() => import("../lazy/lazyImage"));

  const handleDeleteImage = async () => {
    myStore.set(confirmBox, {
      action: "",
      text: t("components.modals.confirmModal.deleteFile"),
      result: "",
      actionToDo: async () => {
        const result = await deleteImage(selectedNation.data.url.map);
        if (result) {
          updatePath("data.url.map", "", false);
        }
      },
    });
  };

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
                    <CrossButton small={true} click={handleDeleteImage} />
                  )}
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
          }
        />
      }
    />
  );
}
