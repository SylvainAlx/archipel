import IconLink from "./iconLink";
import { myStore, nationAtom } from "../settings/store";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const nation = myStore.get(nationAtom);
  const { t } = useTranslation();

  return (
    <>
      <IconLink path="/nations" text={t("components.buttons.explore")} />
      {nation.name === "" || nation.name === undefined ? (
        <>
          <IconLink path="/login" text={t("components.buttons.login")} />
          <IconLink path="/register" text={t("components.buttons.register")} />
        </>
      ) : (
        <>
          <IconLink path="/nation" text={t("components.buttons.nation")} />
          {nation.role === "admin" && (
            <IconLink path="/admin" text={t("components.buttons.admin")} />
          )}
          <IconLink path="/logout" text={t("components.buttons.logout")} />
        </>
      )}
    </>
  );
}
