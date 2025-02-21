import IconLink from "./iconLink";
import { nationListAtomV2, sessionAtom } from "../settings/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import MenuButton from "./buttons/menuButton";
import { NationModel } from "../models/nationModel";
import { useEffect, useState } from "react";

export default function Nav() {
  const [session] = useAtom(sessionAtom);
  const [nationList] = useAtom(nationListAtomV2);
  const [nation, setNation] = useState<NationModel>(new NationModel());
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNation = async (officialId: string) => {
      const loadedNation = nationList.getByOfficialId(officialId);
      if (loadedNation) {
        setNation(loadedNation);
      }
    };
    if (session.user.citizenship.nationId != "") {
      loadNation(session.user.citizenship.nationId);
    }
  }, [session.user, nationList]);

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
      <div className="self-center">
        <MenuButton />
      </div>
    </>
  );
}
