import { ChangeEvent } from "react";
import i18n from "../../i18n/i18n";
import { myStore, showLangModalAtom } from "../../settings/store";

export function useLangModal() {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    myStore.set(showLangModalAtom, false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    myStore.set(showLangModalAtom, false);
  };

  return {
    handleChange,
    handleSubmit,
  };
}
