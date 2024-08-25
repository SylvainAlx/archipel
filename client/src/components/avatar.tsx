import { useEffect, useState, lazy, Suspense } from "react";
import { RxAvatar } from "react-icons/rx";
import Spinner from "./loading/spinner";
import { useTranslation } from "react-i18next";
import { getCachedImage } from "../utils/functions";

export interface AvatarProps {
  url: string;
}

export default function Avatar({ url }: AvatarProps) {
  const LazyImage = lazy(() => import("./lazy/lazyImage"));
  const { t } = useTranslation();
  const [cachedImage, setCachedImage] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      getCachedImage(url).then(setCachedImage);
    }
  }, [url]);

  return (
    <div className="animate-fadeIn h-[80px] w-[80px] flex flex-col justify-center rounded-full overflow-hidden">
      {cachedImage ? (
        <img
          src={cachedImage}
          alt="avatar"
          className="object-cover w-full h-full rounded cursor-zoom-in"
          title={t("components.hoverInfos.avatar")}
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
          <RxAvatar />
        </div>
      )}
    </div>
  );
}
