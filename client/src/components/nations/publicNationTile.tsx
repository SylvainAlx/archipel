import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import { RiShieldUserFill } from "react-icons/ri";
import Points from "../points";

export default function PublicNationTile({ name, role, data }: Nation) {
  // const createdAtDate: Date = new Date(createdAt);
  // const formattedDate: string = createdAtDate.toLocaleDateString();

  return (
    <div className="w-[300px] bg-complementary flex flex-col items-center p-4 gap-4 rounded hover:scale-105 cursor-pointer transition-all duration-300">
      {data.url.flagUrl != "" ? (
        <img src={data.url.flagUrl} />
      ) : (
        <div className="text-5xl">
          <GiBlackFlag />
        </div>
      )}
      <div className="flex gap-2 items-center text-secondary">
        {role === "admin" && <RiShieldUserFill />}
        <h2 className="text-xl">{name}</h2>
      </div>
      <Points text={data.general.points} />
      {/* <em className="text-[8px]">{formattedDate}</em> */}
    </div>
  );
}
