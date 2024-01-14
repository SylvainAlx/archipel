import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import Points from "../points";

export default function PublicNationTile({ name, data }: Nation) {
  // const createdAtDate: Date = new Date(createdAt);
  // const formattedDate: string = createdAtDate.toLocaleDateString();

  return (
    <div className="bg-complementary hover:bg-border-solid flex flex-col items-center p-2 gap-4 rounded transition-all duration-300">
      <div className="w-full flex items-center">
        <div className="w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center">
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
        <h2 className="text-light text-xl pl-4 pr-6">{name}</h2>
      </div>
      <Points text={data.general.points} />

      {/* <em className="text-[8px]">{formattedDate}</em> */}
    </div>
  );
}
