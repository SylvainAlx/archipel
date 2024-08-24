import { useState } from "react";
import HoverInfo from "../hoverInfo";
import { imageAtom, myStore } from "../../settings/store";

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

  const handleClick = (image: string) => {
    myStore.set(imageAtom, image);
  };

  return (
    <>
      <img
        onClick={() => handleClick(src)}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        src={src + "-/preview/"}
        alt={alt}
        className={className}
      />
      {showInfo && <HoverInfo text={hover} />}
    </>
  );
}
