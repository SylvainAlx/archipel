import { ChangeEvent } from "react";
import { myStore, showLangModalAtom } from "../../settings/store";
import Button from "../buttons/button";
import i18n, { langOptions } from "../../i18n/i18n";
import Select from "../form/select";
import { useTranslation } from "react-i18next";

export default function LangModal() {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    myStore.set(showLangModalAtom, false);
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.langModal.title")}
      </h2>
      {langOptions.length > 0 && (
        <Select
          required
          options={langOptions}
          value={i18n.language}
          onChange={handleChange}
        />
      )}
      <Button
        text={t("components.buttons.close")}
        click={() => myStore.set(showLangModalAtom, false)}
      />
    </>
  );
}
