import { IoLanguage } from "react-icons/io5";
import Button from "./button";
import { langAtom, myStore, showLangModalAtom } from "../settings/store";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

export default function LangButton() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [lang] = useAtom(langAtom);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos <= prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <div
        className={`w-[45px] fixed z-10 right-[10px] top-[10px] ${!visible && "opacity-50"} transition-all duration-300`}
      >
        <Button
          text=""
          path=""
          children={
            <div className="flex items-center gap-1">
              <span className="text-[10px]">{lang.toUpperCase()}</span>
              <IoLanguage />
            </div>
          }
          click={() => myStore.set(showLangModalAtom, true)}
        />
      </div>
    </>
  );
}
