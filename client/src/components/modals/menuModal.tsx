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
        <Button path="/" text={t("pages.home.title")} />
        <Button path="/legalnotice" text={t("pages.legalNotice.title")} />
        <Button path="/termsofservice" text={t("pages.termsOfService.title")} />
      </nav>
      <Button
        path="info"
        text={t("components.buttons.close")}
        click={() => myStore.set(showMenuAtom, false)}
      />
    </>
  );
}
