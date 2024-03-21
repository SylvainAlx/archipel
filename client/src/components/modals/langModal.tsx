import { ChangeEvent } from "react";
import { langAtom, myStore, showLangModalAtom } from "../../settings/store";
import Button from "../button";
import i18n, { langOptions } from "../../i18n/i18n";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

export default function LangModal() {
  const [lang, setLang] = useAtom(langAtom);
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    setLang(e.target.value);
    myStore.set(showLangModalAtom, false);
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.langModal.titles")}
      </h2>
      {langOptions.length > 0 && (
        <Select
          required
          options={langOptions}
          value={lang}
          onChange={handleChange}
        />
      )}
      <Button
        text={t("components.buttons.close")}
        path=""
        click={() => myStore.set(showLangModalAtom, false)}
      />
    </>
  );
}
