import { RoleplayTileProps } from "../../../types/typProp";
import Tag from "../../tag";
import H2 from "../../titles/h2";

export default function RoleplayTile({
  title,
  target,
  cost,
  benefit,
}: RoleplayTileProps) {
  return (
    <div className="w-[180px] p-2 bg-black_alpha rounded flex flex-col items-center gap-3">
      <H2 text={title} />
      <div className="w-[95%] h-[100px] bg-secondary rounded"></div>
      <div className="flex justify-between">
        <Tag text={`${cost} points`} bgColor="bg-danger" />
        <Tag text={`${benefit} points`} bgColor="bg-success" />
      </div>

      <div>Quantité : {target.length}</div>
    </div>
  );
}
