import { FaMoneyBillTransfer } from "react-icons/fa6";
import Button from "./button";
import { NationModel } from "../../../models/nationModel";
import { UserModel } from "../../../models/userModel";
import { useAtom } from "jotai";
import { creditTransferAtom, sessionAtom } from "../../../settings/store";
import { useTranslation } from "react-i18next";

interface CreditTransferButtonProps {
  target: NationModel | UserModel;
}

export default function CreditTransferButton({
  target,
}: CreditTransferButtonProps) {
  const [newTransfer, setNewTransfer] = useAtom(creditTransferAtom);
  const [session] = useAtom(sessionAtom);
  const { t } = useTranslation();
  const handleClick = () => {
    setNewTransfer({
      ...newTransfer,
      sender: { name: session.user.name, officialId: session.user.officialId },
      recipient: { name: target.name, officialId: target.officialId },
    });
  };
  return (
    <Button click={handleClick} text={t("components.buttons.transferCredits")}>
      <FaMoneyBillTransfer />
    </Button>
  );
}
