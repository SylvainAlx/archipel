import { IoLanguage } from "react-icons/io5";
import Button from "./button";
import { myStore, showLangModalAtom } from "../../settings/store";

export default function LangButton() {
  return (
    <Button
      text=""
      children={
        <IoLanguage className="flex items-center gap-1 hover:text-secondary transition-all" />
      }
      click={() => myStore.set(showLangModalAtom, true)}
      bgColor="bg-invisible"
    />
  );
}
