import { ChangeEvent } from "react";
import { myStore, showLangModalAtom } from "../../settings/store";
import Button from "../buttons/button";
import i18n, { langOptions } from "../../i18n/i18n";
import Select from "../form/select";
import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";

export default function LangModal() {
  const { t } = useTranslation();
  const modalRef = useModal(() => myStore.set(showLangModalAtom, false));

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    myStore.set(showLangModalAtom, false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    myStore.set(showLangModalAtom, false);
  };

  return (
    <div ref={modalRef} tabIndex={-1}>
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
      <form onSubmit={handleSubmit} className="flex gap-4 justify-center my-4">
        <Button text={t("components.buttons.close")} type="submit" />
      </form>
    </div>
  );
}
