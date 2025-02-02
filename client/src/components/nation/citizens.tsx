import { useTranslation } from "react-i18next";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import { lazy, Suspense, useEffect, useState } from "react";
import { SelectedNationProps } from "../../types/typProp";
import { confirmBox, sessionAtom } from "../../settings/store";
import { useAtom } from "jotai";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaPassport } from "react-icons/fa";
import { UserListModel } from "../../models/lists/userListModel";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const [session] = useAtom(sessionAtom);
  const [nationUsers, setNationUsers] = useState<UserListModel>(
    new UserListModel(),
  );
  const [listChecked, setListChecked] = useState<boolean>(false);
  const [, setConfirmModal] = useAtom(confirmBox);
  const { t } = useTranslation();
  const CitizenTile = lazy(() => import("../tiles/citizenTile"));

  useEffect(() => {
    const loadRelationList = async () => {
      if (nationUsers.getItems().length === 0) {
        const list = await nationUsers.loadNationUserList(selectedNation);
        setNationUsers(list);
        setListChecked(true);
      }
    };
    if (selectedNation.officialId !== "" && !listChecked) {
      loadRelationList();
    }
  }, [selectedNation.officialId]);

  const askCtz = () => {
    const payload = {
      officialId: session.user.officialId,
      nationId: selectedNation.officialId,
      status: 0,
    };
    setConfirmModal({
      action: "",
      text: t("components.modals.confirmModal.askCitizenship"),
      result: "",
      actionToDo: async () => {
        await session.user.changeStatus(payload);
      },
    });
  };

  return (
    <TileContainer
      children={
        <DashTile
          title={t("pages.nation.citizens.title")}
          className="w-full min-w-[300px] flex-grow"
          children={
            <>
              {session.user.citizenship.status === -1 &&
                session.user.officialId != "" && (
                  <Button
                    text={t("components.buttons.askCitizenship")}
                    click={askCtz}
                    children={<FaPassport />}
                  />
                )}
              <div className="w-full flex flex-col-reverse gap-2 items-center">
                {nationUsers.getItems().length > 0 ? (
                  nationUsers.getItems().map((citizen, i) => {
                    if (
                      citizen.citizenship.nationId === selectedNation.officialId
                    ) {
                      return (
                        <Suspense key={i} fallback={<BarreLoader />}>
                          <div className="relative w-full">
                            <CitizenTile citizen={citizen} />
                          </div>
                        </Suspense>
                      );
                    }
                  })
                ) : (
                  <em className="text-center">
                    {t("pages.nation.citizens.noCitizens")}
                  </em>
                )}
              </div>
            </>
          }
        />
      }
    />
  );
}
