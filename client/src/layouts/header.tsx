import LangButton from "../components/buttons/langButton";
import MenuButton from "../components/buttons/menuButton";
import HeaderNav from "../components/headerNav";
import Logo from "../components/logo";

export default function Header() {
  return (
    <header className="animate-slideInFromTop py-4 px-4 mx-auto md:m-0 sm:flex md:justify-around flex-wrap items-center gap-6">
      <Logo />
      <HeaderNav />
      <div className="fixed z-10 right-[10px] top-[10px] flex items-center gap-2">
        <MenuButton />
        <LangButton />
      </div>
    </header>
  );
}
