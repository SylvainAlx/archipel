import { useAtom } from "jotai";
import Button from "../buttons/button";
import { infoModalAtom, myStore } from "../../settings/store";
import { useTranslation } from "react-i18next";

export default function InfoModal() {
  const [info] = useAtom(infoModalAtom);
  const { t } = useTranslation();

  const handleClick = () => {
    myStore.set(infoModalAtom, "");
  };

  const handlePress = (e: React.KeyboardEvent) => {
    const { key } = e;
    if (key === "Enter") {
      myStore.set(infoModalAtom, "");
    }
  };

  return (
    <>
      <h2 className="text-2xl text-center p-4">INFORMATION</h2>
      <p className="text-center">{info}</p>
      <Button
        text={t("components.buttons.close")}
        click={handleClick}
        keyDown={handlePress}
      />
    </>
  );
}
