import { useEffect, useState } from "react";
import { Nation } from "../types/typNation";
import { getCachedImage } from "../utils/functions";
import { GiBlackFlag } from "react-icons/gi";

interface FlagProps {
  nation: Nation;
  isHeader?: boolean;
}

export default function Flag({ nation, isHeader }: FlagProps) {
  const [cachedImage, setCachedImage] = useState<string | null>(null);

  useEffect(() => {
    if (nation.data.url.flag) {
      getCachedImage(nation.data.url.flag).then(setCachedImage);
    }
  }, [nation.data.url.flag]);

  return (
    <div
      className={
        isHeader
          ? "mt-[2px] rounded-full w-[43px] h-[43px] md:w-[28px] md:h-[28px] overflow-hidden"
          : "w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center overflow-hidden"
      }
    >
      {nation.data.url.flag != "" ? (
        cachedImage ? (
          <img
            src={cachedImage}
            alt={`flag of ${nation.name}`}
            className="w-full h-full"
          />
        ) : (
          <img
            src={nation.data.url.flag}
            alt={`flag of ${nation.name}`}
            className="w-full h-full"
          />
        )
      ) : (
        <div className="text-[3.1rem]">
          <GiBlackFlag />
        </div>
      )}
    </div>
  );
}
