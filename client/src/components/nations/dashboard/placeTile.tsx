import { PlaceTileProp } from "../../../types/typProp";
import Countdown from "../../countdown";
import Tag from "../../tag";
import { FaUserGroup } from "react-icons/fa6";

export default function PlaceTile({
  name,
  population,
  buildDate,
  description,
}: PlaceTileProp) {
  return (
    <div
      className={`w-full p-4 rounded flex flex-col items-center gap-3 shadow-xl`}
    >
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl">{name}</h3>
        <div className="flex items-center gap-2">
          <Tag
            text={population.toString()}
            bgColor="bg-success"
            children={<FaUserGroup />}
          />
        </div>
      </div>
      {buildDate > new Date() && <Countdown targetDate={buildDate} />}
      <em>{description}</em>
    </div>
  );
}
