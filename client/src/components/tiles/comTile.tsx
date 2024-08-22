import { useNavigate } from "react-router-dom";
import { Com } from "../../types/typCom";

export interface ComTileProps {
  com: Com;
}

export default function ComTile({ com }: ComTileProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-end">
        <div onClick={() => navigate(`/nation/${com.originId}`)}>
          {com.originName}
        </div>
      </div>
      <em>{com.message}</em>
    </div>
  );
}
