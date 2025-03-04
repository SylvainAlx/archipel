import TileContainer from "../../tileContainer";

export default function IdSkeleton() {
  return (
    <TileContainer
      children={
        <div className="p-4 bg-complementary animate-pulse rounded flex flex-col items-center gap-2 shadow-md">
          <div className="w-24 h-16 bg-complementary2"></div>
          <div className="w-1/3 h-5 bg-complementary2 rounded"></div>
          <div className="w-1/2 h-4 bg-complementary2 rounded"></div>
          <div className="w-1/2 h-4 bg-complementary2 rounded"></div>
          <div className="w-1/2 h-4 bg-complementary2 rounded"></div>
        </div>
      }
    />
  );
}
