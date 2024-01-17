import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import Tag from "../tag";

export default function PublicNationTile({ name, data, role }: Nation) {
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
      <div className="flex gap-2 self-end flex-wrap justify-end">
        {role === "admin" && <Tag text="admin" bgColor="bg-info" />}
        <Tag
          text={data.general.points.toString() + " points"}
          bgColor="bg-secondary"
        />
        {data.general.regime === -1 && (
          <Tag text="régime politique inconnu" bgColor="bg-danger" />
        )}
      </div>

      {/* <em className="text-[8px]">{formattedDate}</em> */}
    </div>
  );
}
