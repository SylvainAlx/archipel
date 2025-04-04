import { useEffect, useState } from "react";
import { confirmBox, myStore, sessionAtom } from "../../../settings/store";
import { useAtom } from "jotai";
import { DiplomaticRelationship } from "../../../types/typRelation";
import { RelationModel } from "../../../models/relationModel";
import { useTranslation } from "react-i18next";
import { NationListModel } from "../../../models/lists/nationListModel";
import { NationModel } from "../../../models/nationModel";

export default function useRelationTile(relation: DiplomaticRelationship) {
  const [nationIndex, setNationIndex] = useState(-1);
  const [nationList, setNationList] = useState<NationListModel>(
    new NationListModel(),
  );
  const [session] = useAtom(sessionAtom);
  const [needResponse, setNeedResponse] = useState(false);
  const [hoverInfo, setHoverInfo] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const loadNationList = async () => {
      const updatedList = new NationListModel();
      relation.nations.forEach(async (nationInRelation) => {
        let nation = new NationModel();
        await nation.loadNation(nationInRelation.OfficialId);
        updatedList.getItems().push(nation);
      });
      setNationList(updatedList);
    };
    loadNationList();
  }, [relation]);

  useEffect(() => {
    setNeedResponse(
      relation.nations[1].OfficialId === session.user.citizenship.nationId &&
        !relation.nations[1].accepted,
    );
    relation.nations.forEach((nation, i) => {
      if (
        nation.OfficialId === session.user.citizenship.nationId &&
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

  return {
    handleAccept,
    handleRefuse,
    handleLeave,
    nationList,
    needResponse,
    hoverInfo,
    nationIndex,
    setHoverInfo,
    t,
  };
}
