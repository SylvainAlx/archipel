// import { useTranslation } from "react-i18next";
// import Button from "../components/buttons/button";
import { useAtom } from "jotai";
import H1 from "../components/titles/h1";
import {
  confirmBox,
  myStore,
  nationAtom,
  newNationAtom,
  selectedNationAtom,
  userAtom,
} from "../settings/store";
import Button from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar from "../components/avatar";
import { useEffect } from "react";
import { getOneUser } from "../api/user/userAPI";
import { GET_JWT } from "../utils/functions";
import DashTile from "../components/dashTile";
import TileContainer from "../components/tileContainer";
import { emptyNewNationPayload } from "../types/typNation";
import { getNation } from "../api/nation/nationAPI";

export default function Citizen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();

  const [user] = useAtom(userAtom);
  const [nation] = useAtom(nationAtom);

  useEffect(() => {
    if (user.officialId === "" && param.id && !GET_JWT) {
      getOneUser(param.id);
    }
    if (nation.officialId === "" && user.citizenship.nationId != "") {
      getNation(user.citizenship.nationId, user.citizenship.nationOwner);
    }
  }, [param.id, user, nation.officialId]);

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
      <Avatar />
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
                    <Button
                      text={t("components.buttons.createNation")}
                      click={() => handleClick("new")}
                    />
                    <Button
                      text={t("components.buttons.joinNation")}
                      click={() => handleClick("join")}
                    />
                  </>
                )
              }
            />

            <DashTile
              title="paramètre du compte"
              children={
                user.officialId != "" ? (
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
                ) : (
                  <></>
                )
              }
            />
          </>
        }
      />
    </>
  );
}
