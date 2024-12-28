import { useEffect, useState } from "react";
import HoverInfo from "../hoverInfo";
import { imageAtom, myStore } from "../../settings/store";
import { getCachedImage } from "../../utils/functions";

export interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
  hover: string;
}

export default function LazyImage({
  src,
  alt,
  className,
  hover,
}: LazyImageProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [cachedImage, setCachedImage] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      getCachedImage(src).then(setCachedImage);
    }
  }, [src]);

  const handleClick = (image: string) => {
    myStore.set(imageAtom, image);
  };

  return (
    <>
      <img
        onClick={() => handleClick(src)}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        src={cachedImage != null ? cachedImage : src}
        alt={alt}
        className={className}
      />
      {showInfo && <HoverInfo text={hover} />}
    </>
  );
}
