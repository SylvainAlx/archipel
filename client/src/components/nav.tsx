import IconLink from "./iconLink";
import { myStore, nationAtom } from "../settings/store";

export default function Nav() {
  const nation = myStore.get(nationAtom);

  return (
    <>
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
    </>
  );
}
