import { useAtom } from "jotai";
import Button from "./button";
import { nationAtom } from "../utils/store";
import { BooleanProps } from "../utils/types";

export default function NavBar({ isOk }: BooleanProps) {
  const [nation] = useAtom(nationAtom);

  return (
    <nav
      className={`${
        !isOk && "h-0 overflow-hidden sm:h-max sm:overflow-auto"
      } z-50 absolute sm:static top-14 right-3 transition-all duration-300 flex flex-col sm:flex-row justify-center flex-wrap items-end gap-2`}
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
