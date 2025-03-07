import { FaBitcoin, FaEthereum } from "react-icons/fa6";
import { SiCardano, SiSolana } from "react-icons/si";
import Button from "./button";
import { infoModalAtom, myStore } from "../../../settings/store";
import { useTranslation } from "react-i18next";
import {
  ADA_PUBLIC_KEY,
  BTC_PUBLIC_KEY,
  ETH_PUBLIC_KEY,
  SOL_PUBLIC_KEY,
} from "../../../settings/consts";
import { errorMessage, successMessage } from "../../../utils/toasts";
import { BiSolidDonateHeart } from "react-icons/bi";

export default function CryptoDonationButton() {
  const { t } = useTranslation();

  const handleClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      successMessage(t("toasts.successCopy"));
    } catch {
      errorMessage(t("toasts.failedCopy"));
    }
  };
  const handleDonationClick = () => {
    myStore.set(infoModalAtom, {
      subtitle: t("components.modals.infoModal.cryptoAddresses"),
      children: (
        <div className="flex flex-col gap-4">
          {BTC_PUBLIC_KEY != "" && (
            <div className="flex items-center gap-2 flex-wrap">
              <FaBitcoin />
              Bitcoin
              <p
                onClick={() => handleClick(BTC_PUBLIC_KEY)}
                className="flex gap-1 items-center cursor-pointer bg-black text-white text-sm px-2 py-1 rounded break-all"
              >
                {BTC_PUBLIC_KEY}
              </p>
            </div>
          )}
          {ETH_PUBLIC_KEY != "" && (
            <div className="flex items-center gap-2 flex-wrap">
              <FaEthereum />
              Ethereum
              <p
                onClick={() => handleClick(ETH_PUBLIC_KEY)}
                className="flex gap-1 items-center cursor-pointer bg-black text-white text-sm px-2 py-1 rounded break-all"
              >
                {ETH_PUBLIC_KEY}
              </p>
            </div>
          )}
          {SOL_PUBLIC_KEY != "" && (
            <div className="flex items-center gap-2 flex-wrap">
              <SiSolana />
              Solana
              <p
                onClick={() => handleClick(SOL_PUBLIC_KEY)}
                className="flex gap-1 items-center cursor-pointer bg-black text-white text-sm px-2 py-1 rounded break-all"
              >
                {SOL_PUBLIC_KEY}
              </p>
            </div>
          )}
          {ADA_PUBLIC_KEY != "" && (
            <div className="flex items-center gap-2 flex-wrap">
              <SiCardano />
              Cardano
              <p
                onClick={() => handleClick(ADA_PUBLIC_KEY)}
                className="flex gap-1 items-center cursor-pointer bg-black text-white text-sm px-2 py-1 rounded break-all"
              >
                {ADA_PUBLIC_KEY}
              </p>
            </div>
          )}
          <em>{t("components.modals.infoModal.donation")}</em>
        </div>
      ),
    });
  };

  return (
    <Button text={t("components.buttons.donate")} click={handleDonationClick}>
      <BiSolidDonateHeart />
    </Button>
  );
}
