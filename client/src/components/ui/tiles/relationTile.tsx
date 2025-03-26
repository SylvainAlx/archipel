import {
  FaBriefcase,
  FaCoins,
  FaFlask,
  FaMasksTheater,
  FaPen,
  FaPersonMilitaryPointing,
} from "react-icons/fa6";
import CrossButton from "../buttons/crossButton";
import { myStore, newRelationAtom } from "../../../settings/store";
import NationTag from "../tags/nationTag";
import HoverInfo from "../hoverInfo";
import Button from "../buttons/button";
import { RelationModel } from "../../../models/relationModel";
import useRelationTile from "../../../hooks/componentsHooks/useRelationTile";
import Flag from "../flag";

export interface RelationTileProps {
  relation: RelationModel;
}

export default function RelationTile({ relation }: RelationTileProps) {
  const {
    handleAccept,
    handleRefuse,
    handleLeave,
    nationList,
    needResponse,
    hoverInfo,
    nationIndex,
    setHoverInfo,
    t,
  } = useRelationTile(relation);

  return (
    <div
      className={`${needResponse ? "bg-complementary2" : "bg-complementary"} flex-grow p-2 rounded flex flex-col items-center gap-3 shadow-xl`}
    >
      <div className="w-full flex flex-wrap items-center justify-center gap-1">
        {nationList.getItems().map((nation, i) => {
          return <Flag key={i} nation={nation} />;
        })}
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-1">
        {nationList.getItems().map((nation, i) => {
          return <NationTag key={i} label={nation.officialId} />;
        })}
      </div>
      <div className="w-full text-xl flex items-center justify-center gap-2">
        <div className="flex justify-center items-center gap-2 text-2xl text-info">
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
      <div>
        {relation.description != "" ? (
          <p className="text-justify">{relation.description}</p>
        ) : (
          <em className="text-center">
            {t("pages.nation.relations.noDescription")}
          </em>
        )}
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
