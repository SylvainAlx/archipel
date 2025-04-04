import { useState } from "react";
import HoverInfo from "./hoverInfo";

interface AudioProps {
  url: string;
  hover: string;
}

export default function Audio({ url, hover }: AudioProps) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
      <audio
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        className="cursor-help"
        controls
        src={url}
      ></audio>
      {showInfo && <HoverInfo text={hover} />}
    </>
  );
}
