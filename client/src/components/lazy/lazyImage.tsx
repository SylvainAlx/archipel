import { useState } from "react";
import HoverInfo from "../hoverInfo";

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
  return (
    <>
      <img
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
