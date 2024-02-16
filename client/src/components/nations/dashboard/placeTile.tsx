import { PlaceTileProp } from "../../../types/typProp";
import Countdown from "../../countdown";
import Tag from "../../tag";
import { FaTrophy, FaUserGroup } from "react-icons/fa6";

export default function PlaceTile({
  name,
  population,
  points,
  buildDate,
  description,
}: PlaceTileProp) {
  return (
    <div
      className={`w-full p-4 rounded flex flex-col items-center gap-3 bg-complementary2 shadow-xl`}
    >
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl">{name}</h3>
        <div className="flex items-center gap-2">
          <Tag
            text={points.toString()}
            bgColor="bg-info"
            children={<FaTrophy />}
          />
          <Tag
            text={population.toString()}
            bgColor="bg-info"
            children={<FaUserGroup />}
          />
        </div>
      </div>
      {new Date(buildDate) > new Date() && <Countdown targetDate={buildDate} />}
      <em>{description}</em>
    </div>
  );
}
