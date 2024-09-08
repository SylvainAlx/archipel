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
import { useEffect } from "react";
import { getOneUser } from "../api/user/userAPI";
import DashTile from "../components/dashTile";
import TileContainer from "../components/tileContainer";
import { emptyNewNationPayload } from "../types/typNation";
import { getNation } from "../api/nation/nationAPI";
import IdTag from "../components/tags/idTag";
import RoleTag from "../components/tags/roleTag";
import Upploader from "../components/uploader";
import CrossButton from "../components/buttons/crossButton";
import { FaPassport } from "react-icons/fa";

export default function Citizen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  const [citizen, setCitizen] = useAtom(citizenFetchAtom);
  const [nation] = useAtom(nationFetchedAtom);
  const [session] = useAtom(sessionAtom);

  useEffect(() => {
    if (param.id) {
      if (session.user.officialId === param.id) {
        setCitizen(session.user);
      } else {
        getOneUser(param.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, session.user]);

  useEffect(() => {
    if (citizen.citizenship.nationId != "" && nation.officialId === "") {
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
                  </div>
                  {nation != undefined && nation.officialId != "" ? (
                    <Button
                      text={nation.name}
                      click={() => handleClick("nation")}
                      children={<FaPassport />}
                    />
                  ) : (
                    <>
                      {session.user.officialId === citizen.officialId && (
                        <>
                          <Button
                            text={t("components.buttons.createNation")}
                            click={() => handleClick("new")}
                          />
                          <Button
                            text={t("components.buttons.joinNation")}
                            click={() => handleClick("join")}
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
                    />
                    <Button
                      text={t("components.buttons.logout")}
                      bgColor="bg-wait"
                      click={logout}
                    />
                    <Button
                      text={t("components.buttons.deleteAccount")}
                      bgColor="bg-danger"
                      click={handleDelete}
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
