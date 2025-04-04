import { useAtom } from "jotai";
import { confirmBox, sessionAtom } from "../../../settings/store";
import { useEffect, useState } from "react";
import { UserListModel } from "../../../models/lists/userListModel";
import { useTranslation } from "react-i18next";
import { NationModel } from "../../../models/nationModel";

export default function useCitizens(selectedNation: NationModel) {
  const [session] = useAtom(sessionAtom);
  const [nationUsers, setNationUsers] = useState<UserListModel>(
    new UserListModel(),
  );
  const [, setConfirmModal] = useAtom(confirmBox);
  const { t } = useTranslation();

  useEffect(() => {
    const loadNationUsers = async () => {
      const list = await nationUsers.loadNationUserList(selectedNation);
      setNationUsers(list);
    };
    if (selectedNation.officialId !== "") {
      loadNationUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNation]);

  const askCtz = () => {
    const payload = {
      officialId: session.user.officialId,
      nationId: selectedNation.officialId,
      status: 0,
    };
    setConfirmModal({
      text: t("components.modals.confirmModal.askCitizenship"),
      actionToDo: async () => {
        await session.user.changeStatus(payload);
      },
    });
  };

  return {
    askCtz,
    nationUsers,
    session,
    t,
  };
}
