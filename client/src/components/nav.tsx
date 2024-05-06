import IconLink from "./iconLink";
import { confirmBox, myStore, userAtom } from "../settings/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const user = myStore.get(userAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    myStore.set(confirmBox, {
      action: "logout",
      text: t("components.modals.confirmModal.logout"),
      result: "",
    });
  };

  return (
    <>
      <IconLink
        destination="nations"
        text={t("components.buttons.explore")}
        action={() => navigate(`/nations`)}
      />
      {user.name === "" || user.name === undefined ? (
        <>
          <IconLink
            destination="login"
            text={t("components.buttons.login")}
            action={() => navigate(`/login`)}
          />
          <IconLink
            destination="register"
            text={t("components.buttons.register")}
            action={() => navigate(`/register`)}
          />
        </>
      ) : (
        <>
          <IconLink
            destination="user"
            text={t("components.buttons.user")}
            action={() => navigate(`/profile/${user.officialId}`)}
          />
          {user.role === "admin" && (
            <IconLink
              destination="admin"
              text={t("components.buttons.admin")}
              action={() => navigate(`/admin`)}
            />
          )}
          <IconLink
            destination="logout"
            text={t("components.buttons.logout")}
            action={logout}
          />
        </>
      )}
    </>
  );
}
