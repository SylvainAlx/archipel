import { useState } from "react";
import { LazyImageProps } from "../../types/typProp";
import HoverInfo from "../hoverInfo";

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
