import { useEffect, useState, lazy, Suspense } from "react";
import { RxAvatar } from "react-icons/rx";
import Spinner from "./loading/spinner";
import { useTranslation } from "react-i18next";
import { getCachedImage } from "../utils/functions";
import { imageAtom, myStore } from "../settings/store";
import { AiOutlinePicture } from "react-icons/ai";

export interface AvatarProps {
  url: string;
  isUser: boolean;
  isHeader?: boolean;
  bigSize?: boolean;
}

export default function Avatar({
  url,
  isUser,
  isHeader,
  bigSize,
}: AvatarProps) {
  const LazyImage = lazy(() => import("./lazy/lazyImage"));
  const { t } = useTranslation();
  const [cachedImage, setCachedImage] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      getCachedImage(url).then(setCachedImage);
    } else {
      setCachedImage("");
    }
  }, [url]);

  const handleClick = (image: string) => {
    myStore.set(imageAtom, image);
  };

  return (
    <div
      className={
        isHeader
          ? "rounded-full w-[45px] h-[45px] md:w-[28px] md:h-[28px] overflow-hidden"
          : "animate-fadeIn h-[150px] w-[150px] flex flex-col justify-center rounded-full overflow-hidden"
      }
    >
      {cachedImage ? (
        <img
          src={cachedImage}
          alt="avatar"
          className={`object-cover w-full h-full rounded ${!isHeader && "cursor-zoom-in"}`}
          title={t("components.hoverInfos.avatar")}
          onClick={() => !isHeader && handleClick(cachedImage)}
        />
      ) : url ? (
        <Suspense fallback={<Spinner />}>
          <LazyImage
            src={url}
            alt="avatar"
            className={`object-cover w-full h-full rounded ${!isHeader && "cursor-zoom-in"}`}
            hover={t("components.hoverInfos.avatar")}
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
          {isUser ? <RxAvatar /> : <AiOutlinePicture />}
        </div>
      )}
    </div>
  );
}
