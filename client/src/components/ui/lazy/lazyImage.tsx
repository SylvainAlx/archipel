import { useState } from "react";
import HoverInfo from "../hoverInfo";
import { imageAtom, myStore } from "../../../settings/store";

export interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
  hover: string;
  isHeader?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className,
  hover,
  isHeader = false,
}: LazyImageProps) {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = (image: string) => {
    myStore.set(imageAtom, image);
  };

  return (
    <>
      <img
        onClick={() => !isHeader && handleClick(src)}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        src={src}
        alt={alt}
        className={className}
      />
      {showInfo && <HoverInfo text={hover} />}
    </>
  );
}
