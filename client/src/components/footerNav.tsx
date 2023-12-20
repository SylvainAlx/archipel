import { useAtom } from "jotai";
import { nationAtom } from "../utils/store";
import IconLink from "./iconLink";

export default function FooterNav() {
  const [nation] = useAtom(nationAtom);


  return (
    <nav
      className={`sm:hidden w-full py-2 flex justify-evenly items-center bg-secondary`}
    >
      {nation.name === "" || nation.name === undefined ? (
        <>
        <IconLink path="login" text="SE CONNECTER" />
        <IconLink path="register" text="S'ENREGISTRER" />
        </>
      ) : (
        <>
        <IconLink path="dashboard" text={nation.name.toUpperCase()} />
        {nation.role === "admin" && (
        <IconLink path="admin" text="ADMINISTRATION" />
        )}
        <IconLink path="logout" text="SE DÉCONNECTER" />
        </>
      )}
    </nav>
  );
}
