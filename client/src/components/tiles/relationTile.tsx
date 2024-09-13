import { DiplomaticRelationship } from "../../types/typRelation";
import IdTag from "../tags/idTag";
import { Nation } from "../../types/typNation";
import { GiBlackFlag } from "react-icons/gi";
import {
  FaBriefcase,
  FaCoins,
  FaFlask,
  FaHandshakeSimple,
  FaMasksTheater,
  FaPerson,
  FaPersonMilitaryPointing,
} from "react-icons/fa6";

export interface RelationTileProps {
  relation: DiplomaticRelationship;
  selectedNation: Nation;
}

export default function RelationTile({
  relation,
  selectedNation,
}: RelationTileProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div
      className={`w-full p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <div className="w-full flex flex-col items-center gap-4">
          <div className="text-5xl">
            <FaHandshakeSimple />
          </div>
          <em className="text-light text-xl pl-4 pr-6 text-center">
            {relation.name}
          </em>
          <div className="flex flex-wrap justify-center items-center gap-2 text-2xl">
            {relation.kind.business && <FaBriefcase />}
            {relation.kind.coop && <FaPersonMilitaryPointing />}
            {relation.kind.cultural && <FaMasksTheater />}
            {relation.kind.economic && <FaCoins />}
            {relation.kind.scientific && <FaFlask />}
          </div>
          <div>
            {relation.nations.map((nation, i) => {
              if (
                selectedNation.officialId != nation.OfficialId.toLowerCase()
              ) {
                return (
                  <div
                    className="flex flex-wrap justify-center items-center gap-2 bg-complementary2 p-2 rounded-full text-2xl"
                    key={i}
                  >
                    <GiBlackFlag />
                    <IdTag label={nation.OfficialId} />
                    <FaPerson />
                    <IdTag label={nation.AmbassadorId} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
