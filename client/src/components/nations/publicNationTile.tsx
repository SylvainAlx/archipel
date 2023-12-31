import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import Points from "../points";

export default function PublicNationTile({ name, data }: Nation) {
  // const createdAtDate: Date = new Date(createdAt);
  // const formattedDate: string = createdAtDate.toLocaleDateString();

  return (
    <div className="relative w-[300px] bg-complementary flex flex-col items-center p-2 gap-4 rounded">
      <div className="absolute top-[-10px] left-[-10px] w-[50px] h-[50px] bg-complementary border-solid border-2 border-secondary rounded-full flex items-center justify-center">
        {data.url.flagUrl != "" ? (
          <img
            src={data.url.flagUrl}
            alt={`flag of ${name}`}
            className="w-full h-full"
          />
        ) : (
          <div className="text-[3.1rem]">
            <GiBlackFlag />
          </div>
        )}
      </div>
      <h2 className="w-[80%] text-light text-xl pl-3">{name}</h2>
      <Points text={data.general.points} />
      {/* <em className="text-[8px]">{formattedDate}</em> */}
    </div>
  );
}
