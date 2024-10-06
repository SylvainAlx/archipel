import { Tile } from "../../types/typTile";

export default function FreeTile({ title, description, value }: Tile) {
  return (
    <div
      className={`max-w-[300px] p-4 rounded flex flex-col flex-grow items-center justify-between gap-2 bg-complementary shadow-xl`}
    >
      <h4 className="bold text-xl text-center text-secondary">{title}</h4>
      <em className="text-[13px] text-center text-secondary2">{description}</em>
      <p className="text-2xl">{value}</p>
      {/* {updatedAt && <em>{updatedAt.getUTCDate()}</em>} */}
    </div>
  );
}
