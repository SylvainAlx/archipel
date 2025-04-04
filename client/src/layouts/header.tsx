import { useTranslation } from "react-i18next";
import HeaderNav from "../components/nav/headerNav";
import Logo from "../components/ui/logo";
import { lobbyAtom } from "../settings/store";
import { useAtom } from "jotai";
import DevFlag from "../components/ui/devFlag";
import { VERSION } from "../settings/consts";

export default function Header() {
  const { t } = useTranslation();
  const [access] = useAtom(lobbyAtom);

  return (
    <header className="animate-slideInFromTop py-4 px-4 mx-auto md:m-0 lg:flex md:justify-around flex-wrap items-center gap-6">
      <div className="mb-6 lg:mb-0 flex flex-col lg:flex-row gap-2 items-center">
        <Logo />
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-3xl text-center">
            {t("components.logo.title").toUpperCase()}
          </h2>
          <h3 className="text-sm lg:text-md text-center">
            {t("components.logo.subtitle")}
          </h3>
        </div>
      </div>

      {access && <HeaderNav />}
      {VERSION.testing && <DevFlag />}
    </header>
  );
}
