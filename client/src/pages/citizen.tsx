import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  changePasswordModalAtom,
  citizenFetchAtom,
  confirmBox,
  myStore,
  nationFetchedAtom,
  nationPlacesListAtom,
  newNationAtom,
  sessionAtom,
} from "../settings/store";
import Button from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar from "../components/avatar";
import { useEffect, useState } from "react";
import DashTile from "../components/dashTile";
import TileContainer from "../components/tileContainer";
import { emptyNewNationPayload, LabelId } from "../types/typNation";
import IdTag from "../components/tags/idTag";
import RoleTag from "../components/tags/roleTag";
import Upploader from "../components/uploader";
import CrossButton from "../components/buttons/crossButton";
import { GiBlackFlag } from "react-icons/gi";
import ExternalLink from "../components/externalLink";
import { FaLink } from "react-icons/fa";
import EditIcon from "../components/editIcon";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import NationOwnerTag from "../components/tags/nationOwnerTag";
import ResidenceTag from "../components/tags/residenceTag";
import {
  dateIsExpired,
  getLabelIdArrayFromNationPlaceList,
} from "../utils/functions";
import { getNationPlaces } from "../api/place/placeAPI";
import { ConfirmBoxDefault } from "../types/typAtom";
import { getNation } from "../api/nation/nationAPI";
import MDEditor from "@uiw/react-md-editor";
import i18n from "../i18n/i18n";

export default function Citizen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  const [citizen, setCitizen] = useAtom(citizenFetchAtom);
  const [nation] = useAtom(nationFetchedAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [confirm, setConfirm] = useAtom(confirmBox);
  const [nationPlaces] = useAtom(nationPlacesListAtom);
  const [placesList, setPlacesList] = useState<LabelId[]>([]);
  const [, setConfirmModal] = useAtom(confirmBox);
  const [enableLeaving, setEnableLeaving] = useState(false);
  const [userPlan, setUserPlan] = useState("free");

  useEffect(() => {
    if (param.id) {
      if (
        session.user.officialId === param.id &&
        citizen.officialId != session.user.officialId
      ) {
        setCitizen(session.user);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, session.user]);

  useEffect(() => {
    if (
      session.user.officialId === citizen.officialId &&
      !session.user.citizenship.nationOwner
    ) {
      setEnableLeaving(true);
    } else {
      setEnableLeaving(false);
    }
    if (citizen.citizenship.nationId != "") {
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
      nation.officialId != undefined &&
      nation.officialId !== "" &&
      nationPlaces.length === 0
    ) {
      getNationPlaces(nation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nation]);

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
    myStore.set(confirmBox, {
      action: "deleteUser",
      text: t("components.modals.confirmModal.deleteUser"),
      result: "",
    });
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

    const newSession = { ...session };
    newSession.user.citizenship.nationId = "";
    newSession.user.citizenship.status = -1;
    setSession(newSession);
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <H1 text={citizen.name} />
        {session.user.officialId === citizen.officialId && (
          <EditIcon target="citizen" param={citizen.name} path="name" />
        )}
      </div>
      <div className="relative">
        <Avatar url={citizen.avatar} isUser={true} />
        {session.user.officialId === citizen.officialId &&
          (citizen.avatar != "" ? (
            <CrossButton small={true} click={handleDeleteAvatar} />
          ) : (
            <Upploader path="avatar" destination="citizen" maxSize={500000} />
          ))}
      </div>
      <div className="flex items-center justify-center gap-6">
        <span className="flex items-center gap-1">
          <ExternalLink
            url={citizen.link}
            children={<FaLink />}
            hover={t("components.hoverInfos.links.website")}
          />
          {session.user.officialId === citizen.officialId && (
            <EditIcon target="citizen" param={citizen.link} path="link" />
          )}
        </span>

        <span className="flex items-center gap-1">
          <ExternalLink
            url={citizen.email != "" ? "mailto:" + citizen.email : ""}
            children={<BsFillEnvelopeAtFill />}
            hover={t("components.hoverInfos.links.email")}
          />
          {session.user.officialId === citizen.officialId && (
            <EditIcon target="citizen" param={citizen.email} path="email" />
          )}
        </span>
      </div>
      <div className="w-full mt-4 justify-center flex gap-2">
        {citizen.bio ? (
          <MDEditor.Markdown
            className="bg-transparent text-light text-justify"
            source={citizen.bio}
            style={{ whiteSpace: "pre-wrap" }}
          />
        ) : (
          <em className="text-center">{t("pages.citizen.noBio")}</em>
        )}

        {session.user.officialId === citizen.officialId && (
          <EditIcon
            target="citizen"
            param={citizen.bio ? citizen.bio : ""}
            path="bio"
          />
        )}
      </div>

      <TileContainer
        children={
          <>
            <DashTile
              title={t("pages.citizen.virtualCitizenship")}
              children={
                <>
                  <div className="max-w-[90%] flex flex-wrap items-center justify-center gap-1">
                    <IdTag label={citizen.officialId} />
                    {citizen.citizenship.nationOwner && <NationOwnerTag />}

                    <ResidenceTag residenceId={citizen.citizenship.residence} />
                    {placesList.length > 0 &&
                      session.user.officialId === citizen.officialId && (
                        <EditIcon
                          target="citizen"
                          param={placesList}
                          path="citizenship.residence"
                        />
                      )}
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
                      {session.user.officialId === citizen.officialId && (
                        <>
                          <Button
                            text={t("components.buttons.createNation")}
                            click={() => handleClick("new")}
                            widthFull={true}
                          />
                          <Button
                            text={t("components.buttons.joinNation")}
                            click={() => handleClick("join")}
                            widthFull={true}
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              }
            />
            {session.user.officialId === citizen.officialId ? (
              <DashTile
                title={t("pages.citizen.settings")}
                children={
                  <>
                    {userPlan != "free" && (
                      <p>{`plan ${citizen.plan} jusqu'au ${new Date(citizen.expirationDate).toLocaleDateString(i18n.language)}`}</p>
                    )}
                    <Button
                      text={t("components.buttons.changePassword")}
                      click={() => myStore.set(changePasswordModalAtom, true)}
                      widthFull={true}
                    />
                    <Button
                      text={t("components.buttons.logout")}
                      bgColor="bg-wait"
                      click={logout}
                      widthFull={true}
                    />
                    <Button
                      text={t("components.buttons.deleteAccount")}
                      bgColor="bg-danger"
                      click={handleDelete}
                      widthFull={true}
                    />
                  </>
                }
              />
            ) : (
              <></>
            )}
          </>
        }
      />
    </>
  );
}
