import IconLink from "./iconLink";
import { sessionAtom } from "../settings/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import MenuButton from "./buttons/menuButton";
import LangButton from "./buttons/langButton";
import { NationModel } from "../models/nationModel";

export default function Nav({ nation }: { nation: NationModel }) {
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
            nation={nation}
            destination="nation"
            text={t("components.buttons.nation")}
            action={() => navigate(`/nation/${nation.officialId}`)}
          />
        )}
      {session.user.role === "admin" && (
        <IconLink
          destination="admin"
          text={t("components.buttons.admin")}
          action={() => navigate(`/admin`)}
        />
      )}
      <div className="pt-2 flex flex-col self-start">
        <LangButton />
        <MenuButton />
      </div>
    </>
  );
}
