import { Nation } from "../../types/typNation";

export default function PublicNationTile({ _id, name, createdAt }: Nation) {
  const createdAtDate: Date = new Date(createdAt);
  const formattedDate: string = createdAtDate.toLocaleDateString();

  return (
    <div className="w-[300px] bg-complementary flex flex-col p-4 gap-4 rounded hover:scale-105 cursor-pointer transition-all duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-secondary">{name}</h2>
        <em className="text-sm">{formattedDate}</em>
      </div>

      <h3 className="text-sm">ID : {_id}</h3>
    </div>
  );
}
