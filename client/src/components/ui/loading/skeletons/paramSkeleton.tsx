import TileContainer from "../../tileContainer";

export default function ParamSkeleton() {
  return (
    <TileContainer>
      <div className="p-4 bg-complementary animate-pulse rounded flex flex-col items-center gap-2 shadow-md">
        <div className="w-3/4 h-4 bg-complementary2 rounded"></div>
        <div className="w-3/4 h-4 bg-complementary2 rounded"></div>
      </div>
    </TileContainer>
  );
}
