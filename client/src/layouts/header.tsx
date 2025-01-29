import { useTranslation } from "react-i18next";
import HeaderNav from "../components/headerNav";
import Logo from "../components/logo";
import { lobbyAtom, nationListAtomV2, sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import DevFlag from "../components/devFlag";
import { VERSION } from "../settings/consts";
import { useEffect, useState } from "react";
import { NationModel } from "../models/nationModel";

export default function Header() {
  const { t } = useTranslation();
  const [access] = useAtom(lobbyAtom);
  const [session] = useAtom(sessionAtom);
  const [nationList] = useAtom(nationListAtomV2);
  const [nation, setNation] = useState<NationModel>(new NationModel());

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
  }, [session, nationList]);

  return (
    <header className="animate-slideInFromTop py-4 px-4 mx-auto md:m-0 lg:flex md:justify-around flex-wrap items-center gap-6">
      <div className="mb-6 lg:mb-0 flex flex-col lg:flex-row gap-2 items-center">
        <Logo />
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-3xl text-center">
            {t("components.logo.title").toUpperCase()}
          </h2>
          <h4 className="text-sm lg:text-md text-center">
            {t("components.logo.subtitle")}
          </h4>
        </div>
      </div>

      {access && <HeaderNav nation={nation} />}
      {VERSION.testing && <DevFlag />}
    </header>
  );
}
