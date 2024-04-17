import { useState } from "react";
import { ExternalLinkProps } from "../types/typProp";
import HoverInfo from "./hoverInfo";

export default function ExternalLink({
  url,
  children,
  hover,
}: ExternalLinkProps) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      className="relative text-3xl"
    >
      {url != "" ? (
        <a
          href={url}
          target="_blank"
          className="cursor-pointer text-secondary hover:animate-pulse"
        >
          {children}
        </a>
      ) : (
        <div className="opacity-10">{children}</div>
      )}
      {showInfo && <HoverInfo text={hover} />}
    </div>
  );
}
