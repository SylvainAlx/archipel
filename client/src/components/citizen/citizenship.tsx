import { useTranslation } from "react-i18next";
import { languageList } from "../../settings/lists";
import { emptyNewNationPayload, Nation } from "../../types/typNation";
import { User } from "../../types/typUser";
import DashTile from "../dashTile";
import EditIcon from "../editIcon";
import CreditTag from "../tags/creditTag";
import IdTag from "../tags/idTag";
import LanguagesTag from "../tags/languagesTag";
import NationOwnerTag from "../tags/nationOwnerTag";
import RoleTag from "../tags/roleTag";
import Button from "../buttons/button";
import { GiBlackFlag } from "react-icons/gi";
import CrossButton from "../buttons/crossButton";
import { MdAddCircle } from "react-icons/md";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import {
  confirmBox,
  myStore,
  newNationAtom,
  sessionAtom,
} from "../../settings/store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface CitizenshipProps {
  citizen: User;
  nation: Nation;
  owner: boolean;
}

export default function Citizenship({
  citizen,
  nation,
  owner,
}: CitizenshipProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);
  const [enableLeaving, setEnableLeaving] = useState(false);

  useEffect(() => {
    if (owner && !session.user.citizenship.nationOwner) {
      setEnableLeaving(true);
    } else {
      setEnableLeaving(false);
    }
  }, [citizen]);

  const leaveNation = () => {
    const payload = {
      officialId: citizen.officialId,
      nationId: citizen.citizenship.nationId,
      status: -1,
    };
    myStore.set(confirmBox, {
      action: "changeStatus",
      text:
        session.user.citizenship.status > 0
          ? t("components.modals.confirmModal.leaveNation")
          : t("components.modals.confirmModal.cancelCitizenship"),
      result: "",
      payload,
    });
  };

  const handleClick = (dest: string) => {
    if (dest === "nation") {
      navigate(`/nation/${nation.officialId}`);
    } else if (dest === "new") {
      myStore.set(newNationAtom, {
        ...emptyNewNationPayload,
        owner: citizen.officialId,
      });
    } else if (dest === "join") {
      navigate(`/explore/2`);
    }
  };

  return (
    <DashTile
      title={t("pages.citizen.virtualCitizenship")}
      children={
        <>
          <div className="max-w-[90%] flex flex-wrap items-center justify-center gap-1">
            <IdTag label={citizen.officialId} />
            <span className="flex items-center gap-1">
              <LanguagesTag
                languages={citizen.language != "" ? [citizen.language] : []}
              />
              {owner && (
                <EditIcon
                  target="citizen"
                  param={languageList}
                  path="language"
                  indice={citizen.language}
                />
              )}
            </span>
            {owner && <CreditTag label={citizen.credits} owner={true} />}
            {citizen.citizenship.nationOwner && <NationOwnerTag />}
            {citizen.role === "admin" && (
              <RoleTag label={t("pages.citizen.role.admin")} />
            )}
          </div>
          {nation != undefined &&
          nation.officialId != "" &&
          citizen.citizenship.nationId != "" ? (
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <div className="w-[300px] relative flex gap-2 items-center justify-center">
                <Button
                  text={nation.name}
                  click={() => handleClick("nation")}
                  children={<GiBlackFlag />}
                  widthFull={true}
                />
                {enableLeaving && (
                  <CrossButton text="" small={true} click={leaveNation} />
                )}
              </div>
            </div>
          ) : (
            <>
              {owner && (
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    text={t("components.buttons.createNation")}
                    click={() => handleClick("new")}
                    children={<MdAddCircle />}
                  />
                  <Button
                    text={t("components.buttons.joinNation")}
                    click={() => handleClick("join")}
                    children={<FaRegArrowAltCircleRight />}
                  />
                </div>
              )}
            </>
          )}
        </>
      }
    />
  );
}
