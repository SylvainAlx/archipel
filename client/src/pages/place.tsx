import { editPlaceAtom } from "../settings/store";
import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlace } from "../api/place/placeAPI";
import TileContainer from "../components/tileContainer";
import IdTag from "../components/tags/idTag";
import DashTile from "../components/dashTile";
import Button from "../components/button";

export default function Place() {
  const { paramId } = useParams();
  const [data] = useAtom(editPlaceAtom);
  useEffect(() => {
    if (data.place.officialId != paramId && paramId != undefined) {
      getPlace(paramId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <H1 text={data.place.name} />
      {data.place._id && <IdTag label={data.place.officialId} />}
      <Button text="VOIR LA NATION" path={`/nation/${data.place.nation}`} />
      <TileContainer
        children={
          <>
            <section className="flex flex-wrap justify-center gap-2">
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
        }
      />
    </>
  );
}
