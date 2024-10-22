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
}

export default function Avatar({ url, isUser }: AvatarProps) {
  const LazyImage = lazy(() => import("./lazy/lazyImage"));
  const { t } = useTranslation();
  const [cachedImage, setCachedImage] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      getCachedImage(url).then(setCachedImage);
    }
  }, [url]);

  const handleClick = (image: string) => {
    myStore.set(imageAtom, image);
  };

  return (
    <div className="animate-fadeIn h-[80px] w-[80px] flex flex-col justify-center rounded-full overflow-hidden">
      {cachedImage ? (
        <img
          src={cachedImage}
          alt="avatar"
          className="object-cover w-full h-full rounded cursor-zoom-in"
          title={t("components.hoverInfos.avatar")}
          onClick={() => handleClick(cachedImage)}
        />
      ) : url ? (
        <Suspense fallback={<Spinner />}>
          <LazyImage
            src={url}
            alt="avatar"
            className="object-cover w-full h-full rounded cursor-zoom-in"
            hover={t("components.hoverInfos.avatar")}
          />
        </Suspense>
      ) : (
        <div className="text-7xl flex items-center justify-center">
          {isUser ? <RxAvatar /> : <AiOutlinePicture />}
        </div>
      )}
    </div>
  );
}
