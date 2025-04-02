import { useAtom } from "jotai";
import {
  comListAtomV2,
  myStore,
  newComAtom,
  sessionAtom,
} from "../../../settings/store";
import { useEffect, useMemo, useState } from "react";
import { ComListModel } from "../../../models/lists/comListModel";
import { NationModel } from "../../../models/nationModel";
import { COM_TYPE } from "../../../settings/consts";
import { ComPayload, emptyComPayload } from "../../../types/typCom";

export default function useNationComs(selectedNation: NationModel) {
  const [session] = useAtom(sessionAtom);
  const [comList] = useAtom(comListAtomV2);
  const [coms, setComs] = useState<ComListModel>(new ComListModel());

  const comTypes: number[] =
    session.user.citizenship.nationId === selectedNation.officialId
      ? [COM_TYPE.nationPublic.id, COM_TYPE.nationPrivate.id]
      : [COM_TYPE.nationPublic.id];

  const filterComList = useMemo(() => {
    const list = comList
      .getItems()
      .filter(
        (com) =>
          com.destination === selectedNation.officialId &&
          comTypes.includes(com.comType),
      );
    return new ComListModel(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comList]);

  useEffect(() => {
    const loadNationComList = async () => {
      await coms.loadNationComList(
        "",
        selectedNation.officialId,
        comTypes,
        session.user.citizenship.nationId === selectedNation.officialId,
      );
    };
    loadNationComList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNation]);

  useEffect(() => {
    setComs(filterComList);
  }, [filterComList]);

  const handleClick = () => {
    const newCom: ComPayload = {
      comType: 10,
      message: emptyComPayload.message,
      origin: selectedNation.officialId,
      destination: selectedNation.officialId,
      title: emptyComPayload.title,
    };
    myStore.set(newComAtom, newCom);
  };

  return { coms, handleClick };
}
