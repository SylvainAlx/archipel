import { GiBlackFlag } from "react-icons/gi";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Nation } from "../../types/typNation";
import ImageSkeleton from "./loading/skeletons/imageSkeleton";

interface FlagProps {
  nation: Nation;
  isHeader?: boolean;
}

export default function Flag({ nation, isHeader }: FlagProps) {
  const { t } = useTranslation();
  const LazyImage = lazy(() => import("./lazy/lazyImage"));

  return (
    <div
      className={
        isHeader
          ? "mt-[2px] rounded-full w-[43px] h-[43px] md:w-[28px] md:h-[28px] overflow-hidden"
          : "w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center overflow-hidden"
      }
    >
      {nation.data.url.flag != "" ? (
        <Suspense fallback={<ImageSkeleton />}>
          <LazyImage
            src={nation.data.url.flag}
            alt={`flag of ${nation.name}`}
            className={`object-cover w-full h-full rounded ${!isHeader && "cursor-zoom-in"}`}
            hover={t("components.hoverInfos.flag")}
            isHeader={isHeader}
          />
        </Suspense>
      ) : (
        <div className={`${!isHeader ? "text-[3.1rem]" : ""}`}>
          <GiBlackFlag />
        </div>
      )}
    </div>
  );
}
