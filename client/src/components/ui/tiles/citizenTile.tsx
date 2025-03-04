import { useLocation, useNavigate } from "react-router-dom";
import RoleTag from "../tags/roleTag";
import Avatar from "../avatar";
import CitizenTag from "../tags/citizenTag";
import { sessionAtom } from "../../../settings/store";
import { dateIsExpired } from "../../../utils/functions";
import CrossButton from "../buttons/crossButton";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import NationTag from "../tags/nationTag";
import NationOwnerTag from "../tags/nationOwnerTag";
import { useEffect, useState } from "react";
import { IoDiamondOutline } from "react-icons/io5";
import LanguagesTag from "../tags/languagesTag";
import ReportPanel from "../reportPanel";
import DateTag from "../tags/dateTag";
import { PIONEER_DATE } from "../../../settings/consts";
import HonorTag from "../tags/honorTag";
import { UserModel } from "../../../models/userModel";
import OnlineStatusTag from "../tags/onlineStatusTag";

export interface CitizenTileProps {
  citizen: UserModel;
}

export default function CitizenTile({ citizen }: CitizenTileProps) {
  const navigate = useNavigate();
  const emplacement = useLocation();
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const [selfUser, setSelfUser] = useState(false);
  const [sameNation, setSameNation] = useState(false);
  const [userPlan, setUserPlan] = useState("free");
  const pioneerDate = new Date(PIONEER_DATE);
  const citizenCreationDate = new Date(citizen.createdAt);
  const citizenLastVisitDate = new Date(citizen.updatedAt);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      navigate(`/citizen/${citizen.officialId}`);
    }
  };

  useEffect(() => {
    if (citizen.plan != "free" && !dateIsExpired(citizen.expirationDate)) {
      setUserPlan(citizen.plan);
    } else {
      setUserPlan("free");
    }
    if (session.user.citizenship.nationId === citizen.citizenship.nationId) {
      setSameNation(true);
    } else {
      setSameNation(false);
    }
    if (session.user.officialId === citizen.officialId) {
      setSelfUser(true);
    } else {
      setSelfUser(false);
    }
  }, [citizen]);

  return (
    <div
      onClick={handleClick}
      className={`${
        session.user.citizenship.nationOwner &&
        sameNation &&
        citizen.citizenship.status === 0
          ? "bg-complementary2"
          : "bg-complementary"
      } min-h-[100px] p-2 rounded flex flex-col items-center justify-between gap-3 hover:bg-complementary2 cursor-pointer shadow-xl ${(userPlan === "premium" || userPlan === "elite") && "border-2 border-solid border-secondary"}`}
    >
      {userPlan != "free" && (
        <legend className="px-2">
          {
            <b className="flex gap-1 items-center">
              <IoDiamondOutline />
              {userPlan === "premium"
                ? t("pages.citizen.plans.premium")
                : t("pages.citizen.plans.elite")}
            </b>
          }
        </legend>
      )}
      <div className="self-start flex items-center cursor-default">
        <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
          <Avatar url={citizen.avatar} isUser={true} />
        </div>
        <h3
          onClick={handleClick}
          className="flex items-center gap-2 text-light text-xl pl-4 pr-6 cursor-pointer"
        >
          {citizen.name}
        </h3>
      </div>
      <div className="flex gap-1 flex-wrap items-center self-end">
        {!selfUser && <ReportPanel content={citizen} center={false} />}
      </div>
      {session.user.citizenship.nationOwner &&
        sameNation &&
        !selfUser &&
        emplacement.pathname != "/explore" &&
        citizen.citizenship.status > 0 && (
          <div className="w-max self-end">
            <CrossButton click={() => citizen.declineCitizenship()} />
          </div>
        )}

      <div className="max-w-[90%] flex flex-wrap items-center self-end justify-end gap-1">
        {citizen.citizenship.status === 0 &&
          emplacement.pathname ===
            `/nation/${citizen.citizenship.nationId}` && (
            <CitizenTag
              label={t("components.hoverInfos.tags.pendingCitizenship")}
              citizen={citizen}
            />
          )}
        {citizen.role === "admin" && (
          <RoleTag label={t("pages.citizen.role.admin")} />
        )}
        {citizenCreationDate < pioneerDate && (
          <HonorTag honor="honor_pioneer" />
        )}
        {citizen.citizenship.nationOwner && <NationOwnerTag />}
        {citizen.citizenship.nationId != "" &&
          emplacement.pathname != `/nation/${citizen.citizenship.nationId}` && (
            <NationTag label={citizen.citizenship.nationId} />
          )}
        <LanguagesTag language={citizen.language} />
        <DateTag date={citizen.createdAt} />
        <OnlineStatusTag citizenLastVisitDate={citizenLastVisitDate} />
      </div>
    </div>
  );
}
