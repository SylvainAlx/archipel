import Button from "../../components/buttons/button";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import { FaCoins } from "react-icons/fa";
import { emptyCreditTransfert } from "../../types/typAtom";
import { useModal } from "../../hooks/useModal";
import { useCreditTransferModal } from "../../hooks/modalsHooks/useCreditTransferModal";

export default function CreditTransferModal() {
  const {
    selfNation,
    session,
    newTransfer,
    accounts,
    setNewTransfer,
    handleSubmit,
    handleChange,
    handleSelectChange,
    t,
  } = useCreditTransferModal();

  const modalRef = useModal(() => setNewTransfer(emptyCreditTransfert));

  return (
    <div ref={modalRef} tabIndex={-1}>
      <h2 className="text-2xl text-center p-4">
        {t("components.modals.creditTransferModal.title")}
      </h2>
      <p className="text-center">
        {t("components.modals.creditTransferModal.recipient") +
          " : " +
          newTransfer.recipient.name}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center justify-center my-4"
      >
        <Select
          required
          value={newTransfer.sender.officialId}
          options={accounts}
          onChange={handleSelectChange}
          title={t("components.modals.creditTransferModal.accountToBeDebited")}
        />
        <label className="w-full max-w-[300px]">
          <span>
            {t("components.modals.creditTransferModal.amount") +
              " * (" +
              t("components.hoverInfos.tags.credits") +
              ")"}
          </span>
          <Input
            onChange={handleChange}
            name="amount"
            type="number"
            value={newTransfer.amount}
            required
          />
        </label>
        <div className="flex items-center justify-center gap-2">
          <span>
            {t("components.modals.creditTransferModal.remainingBalance")} :
          </span>
          <span>
            {newTransfer.sender.officialId === selfNation.officialId ? (
              <span className="flex gap-1 items-center text-gold">
                {selfNation.data.roleplay.treasury - newTransfer.amount}
                <FaCoins />
              </span>
            ) : (
              <span className="flex gap-1 items-center text-gold">
                {session.user.credits - newTransfer.amount}
                <FaCoins />
              </span>
            )}
          </span>
        </div>
        <Input
          onChange={handleChange}
          name="comment"
          type="text"
          value={newTransfer.comment}
          placeholder={t("components.modals.creditTransferModal.comment")}
        />
        <Button
          text={t("components.buttons.validate")}
          type="submit"
          widthFull={true}
          disabled={newTransfer.amount <= 0}
        />
        <Button
          text={t("components.buttons.cancel")}
          click={() =>
            setNewTransfer({
              sender: {
                name: "",
                officialId: "",
              },
              recipient: {
                name: "",
                officialId: "",
              },
              amount: 0,
              comment: "",
            })
          }
          widthFull={true}
        />
      </form>
    </div>
  );
}
