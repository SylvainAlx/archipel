import { useTranslation } from "react-i18next";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import {
  myStore,
  newRelationAtom,
  relationListAtom,
  sessionAtom,
} from "../../settings/store";
import { lazy, Suspense, useEffect, useState } from "react";
import { getRelations } from "../../api/relation/relationAPI";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaHandshakeSimple } from "react-icons/fa6";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
  NationDiplomacyInfo,
} from "../../types/typRelation";

export default function Diplomacy({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [relationList] = useAtom<DiplomaticRelationship[]>(relationListAtom);
  const [nationRelationList, setNationRelationList] = useState<
    DiplomaticRelationship[]
  >([]);
  const [session] = useAtom(sessionAtom);
  const RelationTile = lazy(() => import("../tiles/relationTile"));

  useEffect(() => {
    getRelations(selectedNation.officialId);
  }, [selectedNation.officialId]);

  useEffect(() => {
    const tempRelations: DiplomaticRelationship[] = [];
    relationList.forEach((relation) => {
      relation.nations.forEach((element) => {
        if (element.OfficialId === selectedNation.officialId) {
          tempRelations.push(relation);
        }
      });
    });
    setNationRelationList(tempRelations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationList]);

  const handleClick = () => {
    const newRelationPayload: DiplomaticRelationship =
      emptyDiplomaticRelationship;
    const nation1: NationDiplomacyInfo = {
      OfficialId: session.user.citizenship.nationId,
      AmbassadorId: "",
      accepted: true,
    };
    const nation2: NationDiplomacyInfo = {
      OfficialId: selectedNation.officialId,
      AmbassadorId: "",
      accepted: false,
    };
    newRelationPayload.name = `${selectedNation.name} & ${session.nation.name}`;
    newRelationPayload.nations = [];
    newRelationPayload.nations.push(nation1);
    newRelationPayload.nations.push(nation2);
    myStore.set(newRelationAtom, {
      relation: newRelationPayload,
      show: true,
      update: false,
    });
  };

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.relations.title")}
          children={
            <div className="w-full flex flex-col-reverse gap-2 items-center">
              {nationRelationList.length > 0 ? (
                nationRelationList.map((relation, i) => {
                  if (relation.nations.length > 1) {
                    return (
                      <Suspense key={i} fallback={<BarreLoader />}>
                        <RelationTile relation={relation} />
                      </Suspense>
                    );
                  }
                })
              ) : (
                <em className="text-center">
                  {t("pages.nation.relations.noRelations")}
                </em>
              )}
              {!owner && session.user.citizenship.nationOwner && (
                <Button
                  text={t("components.buttons.createRelation")}
                  children={<FaHandshakeSimple />}
                  click={handleClick}
                />
              )}
            </div>
          }
        />
      }
    />
  );
}
