import { useAtom } from "jotai";
import IconLink from "./iconLink";
import { nationAtom } from "../settings/store";

export default function Nav() {
  const [nation] = useAtom(nationAtom);
  return (
    <>
      <IconLink path="/nations" text="EXPLORER" />
      <IconLink path="/contact" text="CONTACT" />
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
    </>
  );
}
