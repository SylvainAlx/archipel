import { Com } from "../../types/typCom";
import H3 from "../titles/h3";

export interface ComTileProps {
  com: Com;
}

export default function ComTile({ com }: ComTileProps) {
  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <H3 text={com.originName} />
      </div>
    </div>
  );
}
