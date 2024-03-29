import { Link } from "react-router-dom";
import { myStore, showMenuAtom } from "../../settings/store";
import Button from "../button";
import { useTranslation } from "react-i18next";

export default function MenuModal() {
  const { t } = useTranslation();
  return (
    <>
      <nav
        onClick={() => myStore.set(showMenuAtom, false)}
        className="flex flex-col items-center gap-2"
      >
        <Link to="/legalnotice">{t("pages.legalNotice.title")}</Link>
        <Link to="/termsofservice">{t("pages.termsOfService.title")}</Link>
      </nav>
      <Button
        path="info"
        text={t("components.buttons.close")}
        click={() => myStore.set(showMenuAtom, false)}
      />
    </>
  );
}
