import HeaderNav from "../components/headerNav";
import Logo from "../components/logo";

export default function Header() {
  return (
    <header className="animate-fadeIn py-4 px-4 mx-auto md:m-0 sm:flex md:justify-between flex-wrap items-center gap-6">
      <Logo />
      <HeaderNav />
    </header>
  );
}
