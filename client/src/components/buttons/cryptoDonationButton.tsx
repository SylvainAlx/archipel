import { FaEthereum } from "react-icons/fa6";
import { WALLET_PUBLIC_KEY } from "../../settings/consts";
import Button from "./button";
import { infoModalAtom, myStore } from "../../settings/store";
import { useTranslation } from "react-i18next";

export default function CryptoDonationButton() {
  const { t } = useTranslation();
  const handleDonationClick = () => {
    myStore.set(infoModalAtom, {
      text: `Wallet Ethereum : ${WALLET_PUBLIC_KEY}`,
    });
  };

  return (
    <Button
      text={t("components.buttons.donate")}
      click={handleDonationClick}
      children={<FaEthereum />}
    />
  );
}
