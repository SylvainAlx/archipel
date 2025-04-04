import { useAtom } from "jotai";
import {
  myStore,
  newRelationAtom,
  relationListAtomV2,
  sessionAtom,
} from "../../../settings/store";
import { RelationListModel } from "../../../models/lists/relationListModel";
import { useEffect, useState } from "react";
import { NationModel } from "../../../models/nationModel";
import {
  DiplomaticRelationship,
  emptyDiplomaticRelationship,
  NationDiplomacyInfo,
} from "../../../types/typRelation";
import { RelationModel } from "../../../models/relationModel";

export default function useDiplomacy(selectedNation: NationModel) {
  const [relationList] = useAtom(relationListAtomV2);
  const [nationRelationList, setNationRelationList] =
    useState<RelationListModel>(new RelationListModel());
  const [listChecked, setListChecked] = useState<boolean>(false);
  const [session] = useAtom(sessionAtom);

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

  return {
    nationRelationList,
    session,
    handleClick,
  };
}
