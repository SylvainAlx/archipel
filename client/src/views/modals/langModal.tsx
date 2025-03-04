import { myStore, showLangModalAtom } from "../../settings/store";
import Button from "../../components/ui/buttons/button";
import i18n, { langOptions } from "../../i18n/i18n";
import Select from "../../components/form/select";
import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";
import { useLangModal } from "../../hooks/modalsHooks/useLangModal";

export default function LangModal() {
  const { t } = useTranslation();
  const { handleChange, handleSubmit } = useLangModal();
  const modalRef = useModal(() => myStore.set(showLangModalAtom, false));

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
