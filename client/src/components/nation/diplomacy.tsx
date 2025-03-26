import { useTranslation } from "react-i18next";
import TileContainer from "../ui/tileContainer";
import DashTile from "../ui/dashTile";
import { SelectedNationProps } from "../../types/typProp";
import { useAtom } from "jotai";
import {
  myStore,
  newRelationAtom,
  relationListAtomV2,
  sessionAtom,
} from "../../settings/store";
import { lazy, Suspense, useEffect, useState } from "react";
import Button from "../ui/buttons/button";
import { FaHandshakeSimple } from "react-icons/fa6";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
  NationDiplomacyInfo,
} from "../../types/typRelation";
import { RelationListModel } from "../../models/lists/relationListModel";
import { RelationModel } from "../../models/relationModel";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";

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
  const RelationTile = lazy(() => import("../ui/tiles/relationTile"));

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
      if (!listChecked) {
        loadRelationList();
      } else {
        filterList(relationList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    newRelationPayload.nations = [nation1, nation2];
    myStore.set(newRelationAtom, {
      relation: new RelationModel(newRelationPayload),
      show: true,
      update: false,
    });
  };

  return (
    <TileContainer>
      <DashTile title={t("pages.nation.relations.title")}>
        <div className="w-full flex flex-reverse flex-wrap gap-2 items-center">
          {nationRelationList.getItems().length > 0 ? (
            nationRelationList.getItems().map((relation, i) => {
              if (
                relation.nations.length > 1 &&
                (relation.nations[1].accepted ||
                  relation.nations[1].AmbassadorId === session.user.officialId)
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
              click={handleClick}
            >
              <FaHandshakeSimple />
            </Button>
          )}
        </div>
      </DashTile>
    </TileContainer>
  );
}
