import {
  DiplomaticRelationship,
  NationDiplomacyInfo,
  RelationKind,
} from "../../types/typRelation";
import IdTag from "../tags/idTag";

export interface RelationTileProps {
  officialId: string;
  name: string;
  nations: NationDiplomacyInfo[];
  kind: RelationKind;
  createdAt: Date;
}

export default function RelationTile(relation: DiplomaticRelationship) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div
      className={`p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full flex justify-between">
        <div className="w-full flex flex-col items-center">
          <h3 className="text-light text-xl pl-4 pr-6">{relation.name}</h3>
          <div className="flex justify-center gap-2">
            {relation.nations.map((nation, i) => {
              return (
                <div key={i}>
                  <IdTag label={nation.OfficialId} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
