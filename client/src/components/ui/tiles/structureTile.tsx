import { useNavigate } from "react-router-dom";
import Flag from "../flag";
import { StructureModel } from "../../../models/structureModel";
import PopulationTag from "../tags/populationTag";
import NationTag from "../tags/nationTag";

interface StructureTileProps {
  structure: StructureModel;
}

export default function StructureTile({ structure }: StructureTileProps) {
  const navigate = useNavigate();

  // eslint-disable-next-line no-undef
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      navigate(`/structure/${structure.officialId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-complementary hover:bg-complementary2 flex flex-col items-center p-2 gap-3 rounded transition-all cursor-pointer"
    >
      <div className="self-start flex items-center cursor-default">
        <Flag url={structure.image} name={structure.name} />
        <h3
          onClick={handleClick}
          className="flex items-center gap-1 text-light text-xl pl-4 pr-6 cursor-pointer"
        >
          {structure.name}
        </h3>
      </div>
      {structure.type}
      <div className="max-w-[90%] flex gap-1 self-end flex-wrap justify-end">
        <PopulationTag count={structure.members.length} label="membres" />
      </div>
      <div className="max-w-[90%] flex gap-1 self-end flex-wrap justify-end">
        {structure.establishments.length > 0 &&
          structure.establishments.map((establishment, i) => {
            return <NationTag key={i} label={establishment} />;
          })}
      </div>
    </div>
  );
}
