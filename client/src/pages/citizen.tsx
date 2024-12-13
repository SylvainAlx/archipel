import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  changePasswordModalAtom,
  citizenFetchAtom,
  comFetchedListAtom,
  confirmBox,
  myStore,
  nationFetchedAtom,
  nationPlacesListAtom,
  newNationAtom,
  sessionAtom,
  showCookiesModalAtom,
} from "../settings/store";
import Button from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar from "../components/avatar";
import { useEffect, useState } from "react";
import DashTile from "../components/dashTile";
import { emptyNewNationPayload, LabelId } from "../types/typNation";
import IdTag from "../components/tags/idTag";
import RoleTag from "../components/tags/roleTag";
import Upploader from "../components/uploader";
import CrossButton from "../components/buttons/crossButton";
import { GiBlackFlag } from "react-icons/gi";
import ExternalLink from "../components/externalLink";
import { FaCookieBite, FaLink, FaRegArrowAltCircleRight } from "react-icons/fa";
import EditIcon from "../components/editIcon";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import NationOwnerTag from "../components/tags/nationOwnerTag";
import {
  dateIsExpired,
  displayUnwatchedComs,
  getLabelIdArrayFromNationPlaceList,
} from "../utils/functions";
import { ConfirmBoxDefault } from "../types/typAtom";
import { getNation } from "../api/nation/nationAPI";
import MDEditor from "@uiw/react-md-editor";
import CreditTag from "../components/tags/creditTag";
import { IoDiamondOutline } from "react-icons/io5";
import PlanButton from "../components/buttons/planButton";
import { errorMessage } from "../utils/toasts";
import LanguagesTag from "../components/tags/languagesTag";
import { getComs } from "../api/communication/comAPI";
import DateTag from "../components/tags/dateTag";
import { languageList } from "../settings/lists";
import ReportPanel from "../components/reportPanel";
import ReportedFlag from "../components/reportedFlag";
import { MdAddCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { COM_GENERAL_DESTINATION, COM_TYPE } from "../settings/consts";
import { resetCookieConsentValue } from "react-cookie-consent";
import CookiesModal from "../components/modals/cookiesModal";
import { getOneUser } from "../api/user/userAPI";
import CitizensCom from "../components/citizen/citizensCom";

export default function Citizen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  const [citizen, setCitizen] = useAtom(citizenFetchAtom);
  const [nation] = useAtom(nationFetchedAtom);
  const [comList] = useAtom(comFetchedListAtom);
  const [session] = useAtom(sessionAtom);
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [showCookiesModal, setShowCookiesModal] = useAtom(showCookiesModalAtom);
  const [nationPlaces] = useAtom(nationPlacesListAtom);
  const [, setPlacesList] = useState<LabelId[]>([]);
  const [, setConfirmModal] = useAtom(confirmBox);
  const [enableLeaving, setEnableLeaving] = useState(false);
  const [userPlan, setUserPlan] = useState("free");

  const self = session.user.officialId === citizen.officialId;

  useEffect(() => {
    if (param.id) {
      if (session.user.officialId === param.id) {
        setCitizen(session.user);
        getComs("", session.user.officialId, [
          COM_TYPE.userPrivate.id,
          COM_TYPE.userUpdate.id,
          COM_TYPE.general.id,
        ]);
      } else if (citizen.officialId != param.id) {
        getOneUser(param.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, session.user]);

  useEffect(() => {
    if (self && !session.user.citizenship.nationOwner) {
      setEnableLeaving(true);
    } else {
      setEnableLeaving(false);
    }
    if (
      citizen.citizenship.nationId != "" &&
      nation.officialId != citizen.citizenship.nationId
    ) {
      getNation(citizen.citizenship.nationId);
    }

    if (citizen.plan != "free" && !dateIsExpired(citizen.expirationDate)) {
      setUserPlan(citizen.plan);
    } else {
      setUserPlan("free");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen]);

  useEffect(() => {
    if (
      self &&
      comList.length > 0 &&
      comList[0].destination === citizen.officialId
    ) {
      displayUnwatchedComs(COM_GENERAL_DESTINATION, comList);
      displayUnwatchedComs(citizen.officialId, comList);
    }
  }, [comList]);

  useEffect(() => {
    if (
      nationPlaces.length > 0 &&
      nation.officialId != undefined &&
      nation.officialId !== ""
    ) {
      const list = getLabelIdArrayFromNationPlaceList();
      setPlacesList(list);
    }
  }, [nation.officialId, nationPlaces]);

  useEffect(() => {
    if (confirm.action === "deleteUser" && confirm.result === "OK") {
      navigate(`/`);
      setConfirm(ConfirmBoxDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

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

  const logout = () => {
    myStore.set(confirmBox, {
      action: "logout",
      text: t("components.modals.confirmModal.logout"),
      result: "",
    });
  };

  const handleDelete = () => {
    const payload = window.prompt(t("components.form.input.password"));
    if (payload) {
      myStore.set(confirmBox, {
        action: "deleteUser",
        text: t("components.modals.confirmModal.deleteUser"),
        payload,
        result: "",
      });
    }
  };

  const handleDeleteAvatar = () => {
    myStore.set(confirmBox, {
      action: "deleteFile",
      text: t("components.modals.confirmModal.deleteFile"),
      payload: citizen.avatar,
      result: "",
      target: "avatar",
    });
  };

  const leaveNation = () => {
    const payload = {
      officialId: citizen.officialId,
      nationId: citizen.citizenship.nationId,
      status: -1,
    };
    setConfirmModal({
      action: "changeStatus",
      text:
        session.user.citizenship.status > 0
          ? t("components.modals.confirmModal.leaveNation")
          : t("components.modals.confirmModal.cancelCitizenship"),
      result: "",
      payload,
    });
  };

  const resetCookiesConsent = () => {
    resetCookieConsentValue();
    setShowCookiesModal(true);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <H1 text={citizen.name} />
        {self && <EditIcon target="citizen" param={citizen.name} path="name" />}
      </div>
      <section className="w-full flex flex-wrap gap-8 items-start justify-between">
        {!citizen.reported && (
          <>
            <section className="w-full flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                <Avatar url={citizen.avatar} isUser={true} bigSize={true} />
                {self &&
                  (citizen.avatar != "" ? (
                    <CrossButton small={true} click={handleDeleteAvatar} />
                  ) : (
                    <Upploader
                      path="avatar"
                      destination="citizen"
                      maxSize={500000}
                    />
                  ))}
              </div>
              <div className="flex items-center justify-center gap-6">
                <span className="flex items-center gap-1">
                  <ExternalLink
                    url={citizen.link}
                    children={<FaLink />}
                    hover={t("components.hoverInfos.links.website")}
                  />
                  {self && (
                    <EditIcon
                      target="citizen"
                      param={citizen.link}
                      path="link"
                    />
                  )}
                </span>

                <span className="flex items-center gap-1">
                  <ExternalLink
                    url={citizen.email != "" ? "mailto:" + citizen.email : ""}
                    children={<BsFillEnvelopeAtFill />}
                    hover={t("components.hoverInfos.links.email")}
                  />
                  {self && (
                    <EditIcon
                      target="citizen"
                      param={citizen.email}
                      path="email"
                    />
                  )}
                </span>
              </div>
              <div className="w-full max-w-[300px] md:max-w-lg mt-4 justify-center flex gap-2">
                {citizen.bio ? (
                  <MDEditor.Markdown
                    className="bg-transparent text-light text-justify"
                    source={citizen.bio}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                ) : (
                  <em className="text-center">{t("pages.citizen.noBio")}</em>
                )}

                {self && (
                  <EditIcon
                    target="citizen"
                    param={citizen.bio ? citizen.bio : ""}
                    path="bio"
                  />
                )}
              </div>
            </section>
            <DashTile
              title={t("pages.citizen.virtualCitizenship")}
              children={
                <>
                  <div className="max-w-[90%] flex flex-wrap items-center justify-center gap-1">
                    <IdTag label={citizen.officialId} />
                    <span className="flex items-center gap-1">
                      <LanguagesTag
                        languages={
                          citizen.language != "" ? [citizen.language] : []
                        }
                      />
                      {self && (
                        <EditIcon
                          target="citizen"
                          param={languageList}
                          path="language"
                          indice={citizen.language}
                        />
                      )}
                    </span>
                    {self && <CreditTag label={citizen.credits} owner={true} />}
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
                          <CrossButton
                            text=""
                            small={true}
                            click={leaveNation}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {self && (
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
          </>
        )}
        {self ? (
          <DashTile
            title={t("pages.citizen.settings")}
            children={
              <>
                {session.user.reported && <ReportedFlag />}
                {userPlan != "free" && (
                  <div className="px-2 flex gap-1 items-center bg-gold rounded text-primary bold">
                    <IoDiamondOutline />
                    <span>
                      {userPlan === "premium"
                        ? t("pages.citizen.plans.premium")
                        : t("pages.citizen.plans.elite")}
                    </span>
                    <DateTag date={citizen.expirationDate} due={true} />
                  </div>
                )}
                <div className="w-full flex flex-wrap gap-2 justify-center">
                  {userPlan === "free" && (
                    <PlanButton
                      click={() =>
                        errorMessage(t("toasts.user.subscriptionNotReady"))
                      }
                    />
                  )}
                  <Button
                    text={t("components.buttons.changePassword")}
                    click={() => myStore.set(changePasswordModalAtom, true)}
                    children={<RiLockPasswordFill />}
                  />
                  <Button
                    text={t("components.buttons.cookiesConsent")}
                    click={resetCookiesConsent}
                    children={<FaCookieBite />}
                  />
                </div>
                <div className="w-full flex flex-wrap gap-2 justify-center">
                  <Button
                    text={t("components.buttons.logout")}
                    bgColor="bg-danger"
                    click={logout}
                    children={<IoMdLogOut />}
                  />
                  <CrossButton
                    text={t("components.buttons.deleteAccount")}
                    click={handleDelete}
                  />
                </div>
              </>
            }
          />
        ) : (
          <div className="w-full flex justify-center">
            <ReportPanel content={citizen} />
          </div>
        )}
        {self && <CitizensCom citizen={citizen} />}
      </section>
      {showCookiesModal && <CookiesModal />}
    </>
  );
}
