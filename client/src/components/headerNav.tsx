import HelpButton from "./buttons/helpButton";
import LangButton from "./buttons/langButton";
import Nav from "./nav";

export default function HeaderNav() {
  return (
    <nav
      className={`hidden transition-all duration-100 md:flex justify-center flex-wrap items-end gap-4`}
    >
      <Nav />
      <div className="pt-2 flex flex-col md:flex-row self-start">
        <LangButton />
        <HelpButton />
      </div>
    </nav>
  );
}
