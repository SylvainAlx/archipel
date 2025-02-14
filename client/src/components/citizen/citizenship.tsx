import { useTranslation } from "react-i18next";
import { genderList, languageList, religionList } from "../../settings/lists";
import { emptyNewNationPayload } from "../../types/typNation";
import DashTile from "../dashTile";
import EditIcon from "../editIcon";
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
import { PIONEER_DATE, PLACE_TYPE } from "../../settings/consts";
import ReligionTag from "../tags/religionTag";
import GenderTag from "../tags/genderTag";
import HonorTag from "../tags/honorTag";
import { UserModel } from "../../models/userModel";
import ResidenceTag from "../tags/residenceTag";
import { NationModel } from "../../models/nationModel";
import { useLoadNationPlaces } from "../../hooks/useLoadNationPlaces";
import { PlaceListModel } from "../../models/lists/placeListModel";
import CreditTag from "../tags/creditTag";
import CreditTransferButton from "../buttons/creditTransferButton";

interface CitizenshipProps {
  citizen: UserModel;
  setCitizen: React.Dispatch<React.SetStateAction<UserModel>>;
  nation: NationModel;
  owner: boolean;
  updatePath: (path: string, value: string) => void;
}

export default function Citizenship({
  citizen,
  setCitizen,
  nation,
  owner,
  updatePath,
}: CitizenshipProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session] = useAtom(sessionAtom);
  const nationPlaceList = useLoadNationPlaces(nation);
  const [cities, setCities] = useState(new PlaceListModel());
  const [enableLeaving, setEnableLeaving] = useState(false);

  const pioneerDate = new Date(PIONEER_DATE);
  const citizenCreationDate = new Date(citizen.createdAt);

  useEffect(() => {
    if (owner && !session.user.citizenship.nationOwner) {
      setEnableLeaving(true);
    } else {
      setEnableLeaving(false);
    }
  }, [citizen, session.user]);

  useEffect(() => {
    setCities(nationPlaceList.getCities());
  }, [nationPlaceList]);

  const leaveNation = () => {
    const payload = {
      officialId: citizen.officialId,
      nationId: citizen.citizenship.nationId,
      status: -1,
    };
    myStore.set(confirmBox, {
      text:
        session.user.citizenship.status > 0
          ? t("components.modals.confirmModal.leaveNation")
          : t("components.modals.confirmModal.cancelCitizenship"),
      actionToDo: async () => {
        setCitizen(await citizen.changeStatus(payload));
      },
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
              <GenderTag genderId={citizen.gender} />
              {owner && (
                <EditIcon
                  target="citizen"
                  param={genderList}
                  path="gender"
                  indice={citizen.gender}
                  action={updatePath}
                />
              )}
            </span>
            <span className="flex items-center gap-1">
              <LanguagesTag language={citizen.language} />
              {owner && (
                <EditIcon
                  target="citizen"
                  param={languageList}
                  path="language"
                  indice={citizen.language}
                  action={updatePath}
                />
              )}
            </span>
            <span className="flex items-center gap-1">
              <ReligionTag religionId={citizen.religion} />
              {owner && (
                <EditIcon
                  target="citizen"
                  param={religionList}
                  path="religion"
                  indice={citizen.religion}
                  action={updatePath}
                />
              )}
            </span>
            <ResidenceTag
              residenceId={citizen.citizenship.residence}
              nationPlaces={cities}
            />
            {owner && cities.getItems().length > 0 && (
              <EditIcon
                target="citizen"
                param={cities.getLabelIdPlaceList([PLACE_TYPE.city.id])}
                path="citizenship.residence"
                indice={citizen.citizenship.residence}
                action={updatePath}
              />
            )}
            {owner && <CreditTag label={citizen.credits} owner={true} />}
            {citizen.citizenship.nationOwner && <NationOwnerTag />}
            {citizen.role === "admin" && (
              <RoleTag label={t("pages.citizen.role.admin")} />
            )}
            {citizenCreationDate < pioneerDate && (
              <HonorTag honor="honor_pioneer" />
            )}
          </div>
          {session.user.officialId != citizen.officialId &&
            session.user.officialId != "" && (
              <CreditTransferButton target={citizen} />
            )}
          {nation != undefined &&
          nation.officialId != "" &&
          citizen.citizenship.nationId != "" ? (
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <Button
                text={nation.name}
                click={() => handleClick("nation")}
                children={<GiBlackFlag />}
                widthFull={true}
                lowerCase={false}
              />
              {enableLeaving && (
                <CrossButton text="" small={true} click={leaveNation} />
              )}
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
