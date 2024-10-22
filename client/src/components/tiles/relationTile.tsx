import { DiplomaticRelationship } from "../../types/typRelation";
import {
  FaBriefcase,
  FaCoins,
  FaFlask,
  FaHandshakeSimple,
  FaMasksTheater,
  FaPersonMilitaryPointing,
} from "react-icons/fa6";
import CrossButton from "../buttons/crossButton";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { confirmBox, myStore, sessionAtom } from "../../settings/store";
import { useTranslation } from "react-i18next";
import NationTag from "../tags/nationTag";
import HoverInfo from "../hoverInfo";

export interface RelationTileProps {
  relation: DiplomaticRelationship;
}

export default function RelationTile({ relation }: RelationTileProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const [nationIndex, setNationIndex] = useState(-1);
  const [session] = useAtom(sessionAtom);
  const { t } = useTranslation();
  const [hoverInfo, setHoverInfo] = useState("");

  useEffect(() => {
    relation.nations.forEach((rel, i) => {
      if (
        rel.OfficialId === session.user.citizenship.nationId &&
        session.user.citizenship.nationOwner
      ) {
        setNationIndex(i);
      }
    });
  }, [relation, session.user.citizenship]);

  const handleLeave = () => {
    const updatedRelation: DiplomaticRelationship = { ...relation };
    updatedRelation.nations.splice(nationIndex, 1);
    myStore.set(confirmBox, {
      action: "leave",
      text: t("components.modals.confirmModal.leaveRelation"),
      payload: updatedRelation,
      result: "",
    });
  };

  return (
    <div
      className={`w-full p-2 rounded flex flex-col items-center gap-3 bg-complementary shadow-xl`}
    >
      <div className="w-full text-xl flex items-center gap-2">
        <div className="text-5xl">
          <FaHandshakeSimple />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 text-2xl text-info">
          {relation.kind.business && (
            <div
              onMouseEnter={() =>
                setHoverInfo(t("components.hoverInfos.relations.business"))
              }
              onMouseLeave={() => setHoverInfo("")}
            >
              <FaBriefcase />
            </div>
          )}
          {relation.kind.coop && (
            <div
              onMouseEnter={() =>
                setHoverInfo(t("components.hoverInfos.relations.coop"))
              }
              onMouseLeave={() => setHoverInfo("")}
            >
              <FaPersonMilitaryPointing />
            </div>
          )}
          {relation.kind.cultural && (
            <div
              onMouseEnter={() =>
                setHoverInfo(t("components.hoverInfos.relations.cultural"))
              }
              onMouseLeave={() => setHoverInfo("")}
            >
              <FaMasksTheater />
            </div>
          )}
          {relation.kind.economic && (
            <div
              onMouseEnter={() =>
                setHoverInfo(t("components.hoverInfos.relations.economic"))
              }
              onMouseLeave={() => setHoverInfo("")}
            >
              <FaCoins />
            </div>
          )}
          {relation.kind.scientific && (
            <div
              onMouseEnter={() =>
                setHoverInfo(t("components.hoverInfos.relations.scientific"))
              }
              onMouseLeave={() => setHoverInfo("")}
            >
              <FaFlask />
            </div>
          )}
        </div>
      </div>
      <div className="text-xl">{relation.name}</div>
      <div className="w-full flex flex-wrap items-center justify-end gap-1">
        {relation.nations.map((nation, i) => {
          return <NationTag key={i} label={nation.OfficialId} />;
        })}
      </div>
      <div className="self-end">
        {nationIndex != -1 && (
          <CrossButton click={handleLeave} text="rompre la relation" />
        )}
      </div>
      {hoverInfo != "" && <HoverInfo text={hoverInfo} />}
    </div>
  );
}
