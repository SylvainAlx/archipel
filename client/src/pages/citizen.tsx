import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  changePasswordModalAtom,
  citizenFetchAtom,
  confirmBox,
  myStore,
  nationFetchedAtom,
  newNationAtom,
  sessionAtom,
} from "../settings/store";
import Button from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar from "../components/avatar";
import { useEffect, useState } from "react";
import { getOneUser } from "../api/user/userAPI";
import DashTile from "../components/dashTile";
import TileContainer from "../components/tileContainer";
import { emptyNewNationPayload } from "../types/typNation";
import { getNation } from "../api/nation/nationAPI";
import IdTag from "../components/tags/idTag";
import RoleTag from "../components/tags/roleTag";
import Upploader from "../components/uploader";
import CrossButton from "../components/buttons/crossButton";
import { GiBlackFlag } from "react-icons/gi";
import FounderTag from "../components/tags/nationTag";

export default function Citizen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  const [citizen, setCitizen] = useAtom(citizenFetchAtom);
  const [nation] = useAtom(nationFetchedAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [, setConfirmModal] = useAtom(confirmBox);
  const [enableLeaving, setEnableLeaving] = useState(false);

  useEffect(() => {
    if (param.id) {
      if (
        session.user.officialId === param.id &&
        citizen.officialId != session.user.officialId
      ) {
        setCitizen(session.user);
      } else {
        getOneUser(param.id);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen]);

  const handleClick = (dest: string) => {
    if (dest === "nation") {
      navigate(`/nation/${nation.officialId}`);
    } else if (dest === "new") {
      myStore.set(newNationAtom, {
        ...emptyNewNationPayload,
        owner: citizen.officialId,
      });
    } else if (dest === "join") {
      navigate(`/explore`);
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
    navigate("/");
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
      <H1 text={citizen.name} />
      <div className="relative">
        <Avatar url={citizen.avatar} />
        {session.user.officialId === citizen.officialId &&
          (citizen.avatar != "" ? (
            <CrossButton small={true} click={handleDeleteAvatar} />
          ) : (
            <Upploader path="avatar" destination="citizen" />
          ))}
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
                    {citizen.role === "admin" && <RoleTag label="admin" />}
                    {citizen.citizenship.nationId != "" && (
                      <FounderTag
                        label={citizen.citizenship.nationId}
                        founder={citizen.citizenship.nationOwner}
                      />
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
