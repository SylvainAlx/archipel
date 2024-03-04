import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import Tag from "../tag";
import { regimeOptions } from "../../settings/consts";
import { FaTrophy, FaUserGroup } from "react-icons/fa6";
import IdTag from "../tags/idTag";

export default function PublicNationTile({ _id, name, data, role }: Nation) {
  // const createdAtDate: Date = new Date(createdAt);
  // const formattedDate: string = createdAtDate.toLocaleDateString();

  return (
    <div className="bg-complementary hover:bg-black_alpha hover:cursor-pointer flex flex-col items-center p-2 gap-4 rounded transition-all">
      <div className="w-full flex items-center">
        <div className="w-[50px] h-[50px] bg-complementary rounded-full flex items-center justify-center overflow-hidden">
          {data.url.flag != "" ? (
            <img
              src={data.url.flag}
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
        <IdTag label={_id} />
        {role === "admin" && <Tag text="admin" bgColor="bg-success" />}
        <Tag
          text={data.roleplay.points.toString()}
          bgColor="bg-info"
          children={<FaTrophy />}
        />
        <Tag
          text={data.roleplay.population.toString()}
          bgColor="bg-info"
          children={<FaUserGroup />}
        />
        {regimeOptions.map((regime, i) => {
          if (regime.id === data.general.regime) {
            return (
              <span key={i}>
                <Tag text={regime.label} bgColor={regime.color} />
              </span>
            );
          }
        })}
      </div>

      {/* <em className="text-[8px]">{formattedDate}</em> */}
    </div>
  );
}
