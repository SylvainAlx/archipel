import { useTranslation } from "react-i18next";
import TileContainer from "../tileContainer";
import DashTile from "../dashTile";
import { lazy, Suspense, useEffect } from "react";
import { getNationCitizens } from "../../api/user/userAPI";
import { SelectedNationProps } from "../../types/typProp";
import {
  confirmBox,
  nationCitizenListAtom,
  sessionAtom,
} from "../../settings/store";
import { useAtom } from "jotai";
import BarreLoader from "../loading/barreLoader";
import Button from "../buttons/button";
import { FaPassport } from "react-icons/fa";

export default function Citizens({ selectedNation }: SelectedNationProps) {
  const [nationCitizenList] = useAtom(nationCitizenListAtom);
  const [session] = useAtom(sessionAtom);
  const [, setConfirmModal] = useAtom(confirmBox);
  const { t } = useTranslation();
  const CitizenTile = lazy(() => import("../tiles/citizenTile"));

  useEffect(() => {
    if (selectedNation.officialId !== "") {
      getNationCitizens(selectedNation);
    }
  }, [selectedNation]);

  const askCtz = () => {
    const payload = {
      officialId: session.user.officialId,
      nationId: selectedNation.officialId,
      status: 0,
    };
    setConfirmModal({
      action: "changeStatus",
      text: t("components.modals.confirmModal.askCitizenship"),
      result: "",
      payload,
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
                {nationCitizenList.length > 0 ? (
                  nationCitizenList.map((citizen, i) => {
                    return (
                      <Suspense key={i} fallback={<BarreLoader />}>
                        <div className="relative w-full">
                          <CitizenTile citizen={citizen} />
                        </div>
                      </Suspense>
                    );
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
