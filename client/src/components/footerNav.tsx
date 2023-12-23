import { useAtom } from "jotai";
import { nationAtom } from "../utils/store";
import IconLink from "./iconLink";

export default function FooterNav() {
  const [nation] = useAtom(nationAtom);

  return (
    <nav
      className={`fixed bottom-0 md:hidden w-full h-[80px] py-2 flex justify-evenly items-center bg-secondary`}
    >
      <IconLink path="/nations" text="EXPLORER" />
      {nation.name === "" || nation.name === undefined ? (
        <>
          <IconLink path="/login" text="SE CONNECTER" />
          <IconLink path="/register" text="S'ENREGISTRER" />
        </>
      ) : (
        <>
          <IconLink path="/dashboard" text="MA NATION" />
          {nation.role === "admin" && (
            <IconLink path="/admin" text="ADMINISTRATION" />
          )}
          <IconLink path="/logout" text="SE DÉCONNECTER" />
        </>
      )}
    </nav>
  );
}
