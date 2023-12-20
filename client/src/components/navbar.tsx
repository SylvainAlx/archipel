import { useAtom } from "jotai";
import Button from "./button";
import { nationAtom } from "../utils/store";

export default function NavBar() {
  const [nation] = useAtom(nationAtom);

  return (
    <nav
      className={`hidden transition-all duration-100 sm:flex justify-center flex-wrap items-end gap-2`}
    >
      {nation.name === "" || nation.name === undefined ? (
        <>
          <Button path="login" text="SE CONNECTER" />
          <Button path="register" text="S'ENREGISTRER" />
        </>
      ) : (
        <>
          <Button path="dashboard" text={nation.name} />
          {nation.role === "admin" && (
            <Button path="admin" text="ADMINISTRATION" />
          )}
          <Button path="logout" text="SE DÉCONNECTER" />
        </>
      )}
    </nav>
  );
}
