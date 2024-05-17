import { useNavigate } from "react-router-dom";
import { myStore, showMenuAtom } from "../../settings/store";
import Button from "../buttons/button";
import { useTranslation } from "react-i18next";

export default function MenuModal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <nav
        onClick={() => myStore.set(showMenuAtom, false)}
        className="flex flex-col items-center gap-2"
      >
        <Button
          text={t("pages.legalNotice.title")}
          click={() => navigate("/legalnotice")}
        />
        <Button
          text={t("pages.termsOfService.title")}
          click={() => navigate("/termsofservice")}
        />
      </nav>
      <Button
        text={t("components.buttons.close")}
        click={() => myStore.set(showMenuAtom, false)}
      />
    </>
  );
}
