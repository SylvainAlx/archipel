import { editPlaceAtom } from "../settings/store";
import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlace } from "../api/place/placeAPI";
import IdTag from "../components/tags/idTag";
import DashTile from "../components/dashTile";
import EyeButton from "../components/buttons/eyeButton";
import PlaceTag from "../components/tags/placeTag";
import { getPlaceTypeLabel } from "../utils/functions";

export default function Place() {
  const { paramId } = useParams();
  const navigate = useNavigate();
  const [data] = useAtom(editPlaceAtom);
  useEffect(() => {
    if (data.place.officialId != paramId && paramId != undefined) {
      getPlace(paramId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (data.place.nation === data.place.parentId) {
      navigate(`/nation/${data.place.nation}`);
    } else {
      navigate(`/place/${data.place.nation}`);
    }
  };

  return (
    <>
      <H1 text={data.place.name} />
      <div className="flex items-center justify-center gap-1">
        {data.place.officialId && <IdTag label={data.place.officialId} />}
        <PlaceTag label={getPlaceTypeLabel(data.place.type)} />
        <EyeButton text="voir le lieu parent" click={handleClick} />
      </div>
      <section className="w-full flex flex-wrap justify-center gap-2">
        {data.place.builds.map((placeCategory, i) => {
          return (
            <div key={i}>
              <DashTile
                title={placeCategory.label.fr}
                children={
                  <div className="flex flex-col items-center justify-center gap-2">
                    {placeCategory.builds.map((build, j) => {
                      return (
                        <div
                          className="flex flex-col items-center justify-center"
                          key={j}
                        >
                          {build.label.fr}
                        </div>
                      );
                    })}
                  </div>
                }
              />
            </div>
          );
        })}
      </section>
    </>
  );
}
