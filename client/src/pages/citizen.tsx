import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  confirmBox,
  myStore,
  newNationAtom,
  selectedNationAtom,
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
import { EmptyNation, emptyNewNationPayload } from "../types/typNation";
import { getNation } from "../api/nation/nationAPI";
import { emptyUser } from "../types/typUser";

export default function Citizen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  const [user, setUser] = useState(emptyUser);
  const [nation, setNation] = useState(EmptyNation);
  const [session] = useAtom(sessionAtom);

  useEffect(() => {
    if (param.id) {
      if (session.user.officialId === param.id) {
        setUser(session.user);
      } else {
        setUser(getOneUser(param.id));
      }
    }
  }, [param.id, session.user]);

  useEffect(() => {
    if (user.citizenship.nationId != "") {
      setNation(getNation(user.citizenship.nationId));
    }
  }, [user]);

  const handleClick = (dest: string) => {
    if (dest === "nation") {
      myStore.set(selectedNationAtom, nation);
      navigate(`/nation/${nation.officialId}`);
    } else if (dest === "new") {
      myStore.set(newNationAtom, {
        ...emptyNewNationPayload,
        owner: user.officialId,
      });
    } else if (dest === "join") {
      navigate(`/nations`);
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

  return (
    <>
      <H1 text={user.name} />
      <Avatar url={user.avatar} />
      <TileContainer
        children={
          <>
            <DashTile
              title="citoyenneté virtuelle"
              children={
                nation.officialId != "" ? (
                  <Button
                    text={nation.name}
                    click={() => handleClick("nation")}
                  />
                ) : (
                  <>
                    {session.user.officialId && (
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
                )
              }
            />
            {session.user.officialId ? (
              <DashTile
                title="paramètre du compte"
                children={
                  <>
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
