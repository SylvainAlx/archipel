import { lazy, Suspense } from "react";
import { RxAvatar } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { AiOutlinePicture } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import ImageSkeleton from "./loading/skeletons/imageSkeleton";

export interface AvatarProps {
  url: string;
  isUser: boolean;
  isCity?: boolean;
  isHeader?: boolean;
  bigSize?: boolean;
}

export default function Avatar({
  url,
  isUser,
  isCity = false,
  isHeader,
  bigSize,
}: AvatarProps) {
  const LazyImage = lazy(() => import("./lazy/lazyImage"));
  const { t } = useTranslation();

  return (
    <div
      className={`relative rounded-full overflow-hidden
        ${
          isHeader
            ? "w-[45px] h-[45px] md:w-[28px] md:h-[28px]"
            : "animate-fadeIn h-[150px] w-[150px] flex flex-col justify-center"
        }`}
    >
      {url ? (
        <Suspense fallback={<ImageSkeleton />}>
          <LazyImage
            src={url}
            alt="avatar"
            className={`object-cover w-full h-full rounded ${!isHeader && "cursor-zoom-in"}`}
            hover={t("components.hoverInfos.avatar")}
            isHeader={isHeader}
          />
        </Suspense>
      ) : (
        <div
          className={
            !isHeader
              ? `flex justify-center ${bigSize ? "text-9xl" : "text-[3.1rem]"}`
              : ""
          }
        >
          {isUser ? (
            <RxAvatar />
          ) : isCity ? (
            <div className="text-[30px]">
              <FaCity />
            </div>
          ) : (
            <AiOutlinePicture />
          )}
        </div>
      )}
    </div>
  );
}
