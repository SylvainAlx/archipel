import {
  FaBriefcase,
  FaCoins,
  FaFlask,
  FaHandshakeSimple,
  FaMasksTheater,
  FaPen,
  FaPersonMilitaryPointing,
} from "react-icons/fa6";
import CrossButton from "../buttons/crossButton";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  confirmBox,
  myStore,
  newRelationAtom,
  sessionAtom,
} from "../../../settings/store";
import { useTranslation } from "react-i18next";
import NationTag from "../tags/nationTag";
import HoverInfo from "../hoverInfo";
import Button from "../buttons/button";
import { RelationModel } from "../../../models/relationModel";

export interface RelationTileProps {
  relation: RelationModel;
}

export default function RelationTile({ relation }: RelationTileProps) {
  const [nationIndex, setNationIndex] = useState(-1);
  const [session] = useAtom(sessionAtom);
  const [needResponse, setNeedResponse] = useState(false);
  const { t } = useTranslation();
  const [hoverInfo, setHoverInfo] = useState("");

  useEffect(() => {
    setNeedResponse(
      relation.nations[1].OfficialId === session.user.citizenship.nationId &&
        !relation.nations[1].accepted,
    );
    relation.nations.forEach((rel, i) => {
      if (
        rel.OfficialId === session.user.citizenship.nationId &&
        session.user.citizenship.nationOwner
      ) {
        setNationIndex(i);
      }
    });
  }, [relation, session.user.citizenship]);

  const handleAccept = () => {
    const updatedRelation = new RelationModel(relation);
    updatedRelation.nations[nationIndex].accepted = true;
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.acceptRelation"),
      actionToDo: async () => {
        await updatedRelation.baseUpdate(updatedRelation);
      },
    });
  };

  const handleRefuse = () => {
    const updatedRelation = new RelationModel(relation);
    updatedRelation.nations[nationIndex].accepted = true;
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.refuseRelation"),
      actionToDo: async () => {
        await updatedRelation.baseUpdate(updatedRelation);
      },
    });
  };

  const handleLeave = () => {
    const updatedRelation = new RelationModel(relation);
    updatedRelation.nations.splice(nationIndex, 1);
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.leaveRelation"),
      actionToDo: async () => {
        await updatedRelation.baseUpdate(updatedRelation);
      },
    });
  };

  return (
    <div
      className={`${needResponse ? "bg-complementary2" : "bg-complementary"} w-full p-2 rounded flex flex-col items-center gap-3 shadow-xl`}
    >
      <div className="w-full text-xl flex items-center justify-between gap-2">
        <div className="flex justify-center items-center gap-2 text-2xl text-info">
          <div className="text-5xl text-light">
            <FaHandshakeSimple />
          </div>
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
        <div className="text-xl">{relation.name}</div>
      </div>
      <div>
        {relation.description != "" ? (
          <p className="text-justify">{relation.description}</p>
        ) : (
          <em className="text-center">
            {t("pages.nation.relations.noDescription")}
          </em>
        )}
      </div>
      <div className="w-full flex flex-wrap items-center justify-end gap-1">
        {relation.nations.map((nation, i) => {
          return <NationTag key={i} label={nation.OfficialId} />;
        })}
      </div>
      <div className="flex items-center gap-1 self-end">
        {needResponse ? (
          <>
            <Button
              text={t("components.buttons.accept")}
              click={handleAccept}
            />
            <CrossButton
              text={t("components.buttons.refuse")}
              click={handleRefuse}
            />
          </>
        ) : (
          nationIndex != -1 && (
            <>
              <Button
                text={t("components.buttons.edit")}
                click={() =>
                  myStore.set(newRelationAtom, {
                    update: true,
                    show: true,
                    relation,
                  })
                }
              >
                <FaPen />
              </Button>
              <CrossButton
                click={handleLeave}
                text={t("components.buttons.break")}
              />
            </>
          )
        )}
      </div>
      {hoverInfo != "" && <HoverInfo text={hoverInfo} />}
    </div>
  );
}
