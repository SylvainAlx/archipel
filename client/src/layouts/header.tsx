import { useTranslation } from "react-i18next";
import LangButton from "../components/buttons/langButton";
import MenuButton from "../components/buttons/menuButton";
import HeaderNav from "../components/headerNav";
import Logo from "../components/logo";

export default function Header() {
  const { t } = useTranslation();
  return (
    <header className="animate-slideInFromTop py-4 px-4 mx-auto md:m-0 sm:flex md:justify-around flex-wrap items-center gap-6">
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <Logo />
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl">{t("components.logo.title")}</h2>
          <h4 className="text-sm lg:text-md">
            {t("components.logo.subtitle")}
          </h4>
        </div>
      </div>

      <HeaderNav />
      <div className="fixed z-10 right-[10px] top-[10px] flex items-center gap-2">
        <MenuButton />
        <LangButton />
      </div>
    </header>
  );
}
