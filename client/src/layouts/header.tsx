import { useTranslation } from "react-i18next";
import LangButton from "../components/buttons/langButton";
import MenuButton from "../components/buttons/menuButton";
import HeaderNav from "../components/headerNav";
import Logo from "../components/logo";

export default function Header() {
  const { t } = useTranslation();
  const subtitle = t("components.logo.subtitle").split(" ");
  return (
    <header className="animate-slideInFromTop py-4 px-4 mx-auto md:m-0 sm:flex md:justify-around flex-wrap items-center gap-6">
      <div className="flex gap-2 items-center">
        <Logo />
        <h4 className="text-md lg:text-xl xl:text-2xl">
          {subtitle.map((word, i) => {
            return <div key={i}>{word}</div>;
          })}
        </h4>
      </div>

      <HeaderNav />
      <div className="fixed z-10 right-[10px] top-[10px] flex items-center gap-2">
        <MenuButton />
        <LangButton />
      </div>
    </header>
  );
}
