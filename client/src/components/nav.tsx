import IconLink from "./iconLink";
import { sessionAtom } from "../settings/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

export default function Nav() {
  // const user = myStore.get(userAtom);
  const [session] = useAtom(sessionAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <IconLink
        destination="nations"
        text={t("components.buttons.explore")}
        action={() => navigate(`/nations`)}
      />
      {session.user.name === "" || session.user.name === undefined ? (
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
            action={() => navigate(`/citizen/${session.user.officialId}`)}
          />
          {session.user.role === "admin" && (
            <IconLink
              destination="admin"
              text={t("components.buttons.admin")}
              action={() => navigate(`/admin`)}
            />
          )}
        </>
      )}
      {session.user.citizenship.nationId != "" && (
        <IconLink
          destination="nation"
          text={t("components.buttons.nation")}
          action={() =>
            navigate(`/nation/${session.user.citizenship.nationId}`)
          }
        />
      )}
    </>
  );
}
