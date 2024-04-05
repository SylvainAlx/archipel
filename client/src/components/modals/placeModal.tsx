import { useAtom } from "jotai";
import {
  editPlaceAtom,
  // myStore,
  // selectedNationAtom,
} from "../../settings/store";
import { emptyPlace } from "../../types/typPlace";
import Button from "../buttons/button";
// import { placesTypeList } from "../../settings/consts";
// import { FaArrowUpRightDots, FaCoins } from "react-icons/fa6";
import DashTile from "../dashTile";
import IdTag from "../tags/idTag";

export default function PlaceModal() {
  const [data, setData] = useAtom(editPlaceAtom);
  // const selectedNation = myStore.get(selectedNationAtom);

  const handleClose = () => {
    setData({ place: emptyPlace });
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">{data.place.name}</h2>
      {data.place._id && <IdTag label={data.place._id} />}
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
      {/* {data.owner && (
        <Button
          text=""
          path=""
          disabled={
            data.update != undefined &&
            selectedNation.data.roleplay.credits <
              placesTypeList[data.update].cost
          }
          children={
            <div className="w-full flex items-center justify-evenly flex-wrap gap-2 text-sm">
              <span className="flex gap-1 items-center">
                Niveau {data.place.level + 1} <FaArrowUpRightDots />
              </span>
              <span className="flex gap-1 items-center">
                <FaCoins />
                {data.update != undefined && placesTypeList[data.update].cost}
              </span>
            </div>
          }
        />
      )} */}
      <Button text="FERMER" path="" click={handleClose} />
    </>
  );
}
