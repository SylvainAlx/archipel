import { AiOutlineStock } from "react-icons/ai";
import Button from "./button";
import { infoModalAtom, myStore } from "../../../settings/store";
import CreditsParams from "../../creditsParams";
import { useTranslation } from "react-i18next";

export default function CreditsParamsButton() {
  const { t } = useTranslation();
  return (
    <Button
      text=""
      children={
        <AiOutlineStock className="flex items-center gap-1 hover:text-secondary transition-all" />
      }
      click={() =>
        myStore.set(infoModalAtom, {
          subtitle: t("components.modals.infoModal.creditsParams"),
          children: <CreditsParams />,
        })
      }
      bgColor="bg-invisible"
    />
  );
}
