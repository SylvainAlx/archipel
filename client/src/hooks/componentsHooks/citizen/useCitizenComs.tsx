import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { comListAtomV2 } from "../../../settings/store";
import { ComListModel } from "../../../models/lists/comListModel";
import { UserModel } from "../../../models/userModel";
import { COM_TYPE } from "../../../settings/consts";

export default function useCitizenComs(citizen: UserModel) {
  const [comList] = useAtom(comListAtomV2);
  const [listChecked, setListChecked] = useState(false);
  const [citizenComList, setCitizenComList] = useState(new ComListModel());

  const filteredComList = useMemo(() => {
    const list = comList
      .getItems()
      .filter(
        (com) =>
          com.destination === citizen.officialId &&
          [COM_TYPE.userPrivate.id, COM_TYPE.userUpdate.id].includes(
            com.comType,
          ),
      );
    return new ComListModel(list);
  }, [comList, citizen.officialId]);

  useEffect(() => {
    const loadComList = async () => {
      await citizenComList.loadComList("", citizen.officialId, [
        COM_TYPE.userPrivate.id,
        COM_TYPE.userUpdate.id,
      ]);
      setListChecked(true);
    };
    if (!listChecked) {
      loadComList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen.officialId, listChecked]);

  useEffect(() => {
    setCitizenComList(filteredComList);
  }, [filteredComList]);

  return {
    citizenComList,
  };
}
