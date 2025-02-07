export default function TileSkeleton() {
  return (
    <div className="min-w-[300px] w-full p-4 bg-complementary animate-pulse rounded flex flex-col items-end gap-2 shadow-md">
      <div className="w-full self-start flex items-center gap-2">
        {/* Image */}
        <div className="w-16 h-16 bg-complementary2 rounded-full"></div>
        {/* Titre */}
        <div className="w-1/3 h-5 bg-complementary2 rounded"></div>
      </div>
      {/* Bouton */}
      <div className="w-1/4 h-8 bg-complementary2 rounded-full"></div>
      {/* Tags */}
      <div className="w-1/2 h-4 bg-complementary2 rounded"></div>
      <div className="w-1/3 h-4 bg-complementary2 rounded"></div>
    </div>
  );
}
