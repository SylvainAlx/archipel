import { RoleplayTileProps } from "../../../types/typProp";
import Tag from "../../tag";

export default function RoleplayTile({
  title,
  target,
  cost,
  benefit,
}: RoleplayTileProps) {
  return (
    <div className="w-full max-w-[300px] p-2 bg-black_alpha rounded flex flex-col items-center gap-3">
      <div className="w-full flex justify-between items-center">
        <h3>{title}</h3>
        <div className="flex items-center gap-2">
          <Tag text={cost.toString()} bgColor="bg-danger" />
          <Tag text={benefit.toString()} bgColor="bg-success" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div>Quantité : {target.length}</div>
      </div>
    </div>
  );
}
