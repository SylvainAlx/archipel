import { useAtom } from "jotai";
import Button from "../buttons/button";
import { infoModalAtom, myStore } from "../../settings/store";
import { useTranslation } from "react-i18next";

export default function InfoModal() {
  const [info] = useAtom(infoModalAtom);
  const { t } = useTranslation();

  const handleClick = () => {
    myStore.set(infoModalAtom, { text: "", image: "" });
  };

  const handlePress = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === "Enter") {
      myStore.set(infoModalAtom, { text: "", image: "" });
    }
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.infoModal.title")}
      </h2>
      <p className="text-center break-all">{info.text}</p>
      {info.image && (
        <img
          src={info.image}
          alt={info.text}
          className="object-contain w-full h-full"
        />
      )}
      <Button
        text={t("components.buttons.close")}
        click={handleClick}
        keyDown={handlePress}
      />
    </>
  );
}
