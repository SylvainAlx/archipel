import HeaderNav from "../components/headerNav";
import Logo from "../components/logo";
import LangButton from "../components/langButton";

export default function Header() {
  return (
    <header className="animate-fadeIn py-4 px-4 mx-auto md:m-0 sm:flex md:justify-around flex-wrap items-center gap-6">
      <Logo />
      <HeaderNav />
      <LangButton />
    </header>
  );
}
