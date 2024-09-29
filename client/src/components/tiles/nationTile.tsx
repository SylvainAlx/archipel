import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import IdTag from "../tags/idTag";
import PopulationTag from "../tags/populationTag";
import EyeButton from "../buttons/eyeButton";
import { useNavigate } from "react-router-dom";
import RegimeTag from "../tags/regimeTag";
import PlaceTag from "../tags/placeTag";
import { useEffect, useState } from "react";
import { getCachedImage } from "../../utils/functions";

export default function NationTile(nation: Nation) {
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (nation.data.url.flag) {
      getCachedImage(nation.data.url.flag).then(setCachedImage);
    }
  }, [nation.data.url.flag]);

  const handleClick = () => {
    navigate(`/nation/${nation.officialId}`);
  };
  return (
    <div className="bg-complementary flex flex-col items-center p-2 gap-3 rounded transition-all">
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <div className="w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center overflow-hidden">
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
          <h3 className="text-light text-xl pl-4 pr-6">{nation.name}</h3>
        </div>
        <EyeButton click={handleClick} />
      </div>
      <div className="max-w-[80%] flex gap-1 self-end flex-wrap justify-end">
        <IdTag label={nation.officialId} />
        <RegimeTag selectedNation={nation} />
        <PlaceTag label={nation.data.roleplay.places} />
        <PopulationTag label={nation.data.roleplay.citizens} />
        {/* {nation.data.general.tags.length > 0 &&
          nation.data.general.tags.map((tag, i) => {
            return (
              <div key={i}>
                <IdTag label={tag} />
              </div>
            );
          })} */}
      </div>
    </div>
  );
}
