import TileContainer from "../../tileContainer";

export default function MapSkeleton() {
  return (
    <TileContainer
      children={
        <div className="p-4 bg-complementary animate-pulse rounded flex flex-col items-center gap-2 shadow-md">
          <div className="w-full h-48 bg-complementary2"></div>
          <div className="w-1/2 h-4 bg-complementary2 rounded"></div>
        </div>
      }
    />
  );
}
