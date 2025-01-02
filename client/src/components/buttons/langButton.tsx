import { IoLanguage } from "react-icons/io5";
import Button from "./button";
import { myStore, showLangModalAtom } from "../../settings/store";

export default function LangButton() {
  return (
    <>
      <div className={`h-full hover:text-secondary`}>
        <Button
          text=""
          children={
            <div className="flex items-center gap-1">
              <IoLanguage />
            </div>
          }
          click={() => myStore.set(showLangModalAtom, true)}
          bgColor="bg-invisible"
        />
      </div>
    </>
  );
}
