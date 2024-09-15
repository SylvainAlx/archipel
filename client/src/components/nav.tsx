import IconLink from "./iconLink";
import { sessionAtom } from "../settings/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import MenuButton from "./buttons/menuButton";
import LangButton from "./buttons/langButton";

export default function Nav() {
  // const user = myStore.get(userAtom);
  const [session] = useAtom(sessionAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <IconLink
        destination="home"
        text={t("components.buttons.home")}
        action={() => navigate(`/`)}
      />
      <IconLink
        destination="explore"
        text={t("components.buttons.explore")}
        action={() => navigate(`/explore`)}
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
        </>
      )}
      {session.user.citizenship.nationId != "" &&
        session.user.citizenship.status > 0 && (
          <IconLink
            destination="nation"
            text={t("components.buttons.nation")}
            action={() =>
              navigate(`/nation/${session.user.citizenship.nationId}`)
            }
          />
        )}
      <div className="flex flex-col gap-1 self-center">
        <LangButton />
        <MenuButton />
      </div>
    </>
  );
}
