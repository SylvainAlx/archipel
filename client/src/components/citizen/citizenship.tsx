import { useTranslation } from "react-i18next";
import { genderList, languageList, religionList } from "../../settings/lists";
import { emptyNewNationPayload } from "../../types/typNation";
import DashTile from "../ui/dashTile";
import EditButton from "../ui/buttons/editButton";
import IdTag from "../ui/tags/idTag";
import LanguagesTag from "../ui/tags/languagesTag";
import NationOwnerTag from "../ui/tags/nationOwnerTag";
import RoleTag from "../ui/tags/roleTag";
import Button from "../ui/buttons/button";
import { GiBlackFlag } from "react-icons/gi";
import CrossButton from "../ui/buttons/crossButton";
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
import ReligionTag from "../ui/tags/religionTag";
import GenderTag from "../ui/tags/genderTag";
import HonorTag from "../ui/tags/honorTag";
import { UserModel } from "../../models/userModel";
import ResidenceTag from "../ui/tags/residenceTag";
import { NationModel } from "../../models/nationModel";
import { useLoadNationPlaces } from "../../hooks/useLoadNationPlaces";
import { PlaceListModel } from "../../models/lists/placeListModel";
import CreditTag from "../ui/tags/creditTag";
import CreditTransferButton from "../ui/buttons/creditTransferButton";

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
                <EditButton
                  editBox={{
                    target: "citizen",
                    original: genderList,
                    new: citizen.gender,
                    path: "gender",
                    indice: citizen.gender,
                    action: updatePath,
                  }}
                />
              )}
            </span>
            <span className="flex items-center gap-1">
              <LanguagesTag language={citizen.language} />
              {owner && (
                <EditButton
                  editBox={{
                    target: "citizen",
                    original: languageList,
                    new: citizen.language,
                    path: "language",
                    indice: citizen.language,
                    action: updatePath,
                  }}
                />
              )}
            </span>
            <span className="flex items-center gap-1">
              <ReligionTag religionId={citizen.religion} />
              {owner && (
                <EditButton
                  editBox={{
                    target: "citizen",
                    original: religionList,
                    new: citizen.religion,
                    path: "religion",
                    indice: citizen.religion,
                    action: updatePath,
                  }}
                />
              )}
            </span>
            <ResidenceTag
              residenceId={citizen.citizenship.residence}
              nationPlaces={cities}
            />
            {owner && cities.getItems().length > 0 && (
              <EditButton
                editBox={{
                  target: "citizen",
                  original: cities.getLabelIdPlaceList([PLACE_TYPE.city.id]),
                  new:
                    citizen.citizenship.residence != ""
                      ? citizen.citizenship.residence
                      : cities.getLabelIdPlaceList([PLACE_TYPE.city.id])[0].id,
                  path: "citizenship.residence",
                  action: updatePath,
                }}
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
            <div className="w-full flex justify-center items-center flex-wrap gap-2">
              <Button
                text={nation.name}
                click={() => handleClick("nation")}
                children={<GiBlackFlag />}
                lowerCase={false}
              />
              {enableLeaving && (
                <CrossButton
                  text={t("components.buttons.leaveNation")}
                  click={leaveNation}
                />
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
