import { useTranslation } from "react-i18next";
import TileContainer from "../ui/tileContainer";
import DashTile from "../ui/dashTile";
import { lazy, Suspense, useEffect, useState } from "react";
import { SelectedNationProps } from "../../types/typProp";
import { confirmBox, sessionAtom } from "../../settings/store";
import { useAtom } from "jotai";
import Button from "../ui/buttons/button";
import { FaPassport } from "react-icons/fa";
import { UserListModel } from "../../models/lists/userListModel";
import TileSkeleton from "../ui/loading/skeletons/tileSkeleton";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const [session] = useAtom(sessionAtom);
  const [nationUsers, setNationUsers] = useState<UserListModel>(
    new UserListModel(),
  );
  const [, setConfirmModal] = useAtom(confirmBox);
  const { t } = useTranslation();
  const CitizenTile = lazy(() => import("../ui/tiles/citizenTile"));

  useEffect(() => {
    const loadRelationList = async () => {
      if (nationUsers.getItems().length === 0) {
        const list = await nationUsers.loadNationUserList(selectedNation);
        setNationUsers(list);
      }
    };
    if (selectedNation.officialId !== "") {
      loadRelationList();
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

  return (
    <TileContainer>
      <DashTile
        title={t("pages.nation.citizens.title")}
        className="w-full min-w-[300px] flex-grow"
      >
        <>
          {session.user.citizenship.status === -1 &&
            session.user.officialId != "" && (
              <Button
                text={t("components.buttons.askCitizenship")}
                click={askCtz}
              >
                <FaPassport />
              </Button>
            )}
          <div className="w-full flex flex-col-reverse gap-2 items-center">
            {nationUsers.getItems().length > 0 ? (
              nationUsers.getItems().map((citizen, i) => {
                if (
                  citizen.citizenship.nationId === selectedNation.officialId
                ) {
                  return (
                    <Suspense key={i} fallback={<TileSkeleton />}>
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
      </DashTile>
    </TileContainer>
  );
}
