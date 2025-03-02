import HelpButton from "./buttons/helpButton";
import LangButton from "./buttons/langButton";
import Nav from "./nav";
import { sessionAtom } from "../settings/store";
import { useAtom } from "jotai";
import CreditsParamsButton from "./buttons/creditsParamsButton";

export default function HeaderNav() {
  const [session] = useAtom(sessionAtom);
  return (
    <nav
      className={`hidden transition-all duration-100 md:flex justify-center flex-wrap items-end gap-4`}
    >
      <Nav />
      <div className="pt-2 flex flex-col md:flex-row self-start">
        <LangButton />
        {session.user.officialId != "" && <CreditsParamsButton />}
        <HelpButton />
      </div>
    </nav>
  );
}
