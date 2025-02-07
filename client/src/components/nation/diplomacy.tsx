import { useTranslation } from "react-i18next";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import {
  myStore,
  newRelationAtom,
  relationListAtomV2,
  sessionAtom,
} from "../../settings/store";
import { lazy, Suspense, useEffect, useState } from "react";
import Button from "../buttons/button";
import { FaHandshakeSimple } from "react-icons/fa6";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
  NationDiplomacyInfo,
} from "../../types/typRelation";
import { RelationListModel } from "../../models/lists/relationListModel";
import { RelationModel } from "../../models/relationModel";
import TileSkeleton from "../loading/skeletons/tileSkeleton";

export default function Diplomacy({
  selectedNation,
  owner,
}: SelectedNationProps) {
  const { t } = useTranslation();
  const [relationList] = useAtom(relationListAtomV2);
  const [nationRelationList, setNationRelationList] =
    useState<RelationListModel>(new RelationListModel());
  const [listChecked, setListChecked] = useState<boolean>(false);
  const [session] = useAtom(sessionAtom);
  const RelationTile = lazy(() => import("../tiles/relationTile"));

  useEffect(() => {
    const filterList = (list: RelationListModel) => {
      const updatedList = list
        .getItems()
        .filter((relation) =>
          relation.nations.some(
            (nation: { OfficialId: string; AmbassadorId: string }) =>
              nation.OfficialId === selectedNation.officialId ||
              nation.AmbassadorId === selectedNation.owner,
          ),
        );
      setNationRelationList(new RelationListModel(updatedList));
    };
    const loadRelationList = async () => {
      if (nationRelationList.getItems().length === 0) {
        const list = await nationRelationList.loadRelationList(
          selectedNation.officialId,
        );
        setNationRelationList(list);
        setListChecked(true);
      }
    };
    if (selectedNation.officialId !== "") {
      !listChecked ? loadRelationList() : filterList(relationList);
    }
  }, [selectedNation.officialId, relationList]);

  const handleClick = () => {
    const newRelationPayload: DiplomaticRelationship =
      emptyDiplomaticRelationship;
    const nation1: NationDiplomacyInfo = {
      OfficialId: session.user.citizenship.nationId,
      AmbassadorId: session.user.officialId,
      accepted: true,
    };
    const nation2: NationDiplomacyInfo = {
      OfficialId: selectedNation.officialId,
      AmbassadorId: selectedNation.owner,
      accepted: false,
    };
    newRelationPayload.name = t(
      "pages.nation.relations.defaultNewRelationTitle",
    );
    newRelationPayload.nations = [nation1, nation2];
    myStore.set(newRelationAtom, {
      relation: new RelationModel(newRelationPayload),
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
              {nationRelationList.getItems().length > 0 ? (
                nationRelationList.getItems().map((relation, i) => {
                  if (
                    relation.nations.length > 1 &&
                    (relation.nations[1].accepted ||
                      relation.nations[1].AmbassadorId ===
                        session.user.officialId)
                  ) {
                    return (
                      <Suspense key={i} fallback={<TileSkeleton />}>
                        <RelationTile relation={relation} />
                      </Suspense>
                    );
                  } else {
                    return (
                      <em key={i} className="text-center">
                        {t("components.buttons.createRelation")}
                      </em>
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
