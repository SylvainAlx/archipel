import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/button";
import { useAtom } from "jotai";
import {
  confirmBox,
  creditTransferAtom,
  myStore,
  sessionAtom,
} from "../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../../components/form/input";
import { NationModel } from "../../models/nationModel";
import Select from "../../components/form/select";
import { LabelId } from "../../types/typNation";
import { FaCoins } from "react-icons/fa";
import { emptyCreditTransfert } from "../../types/typAtom";
import { useModal } from "../../hooks/useModal";

export default function CreditTransferModal() {
  const { t } = useTranslation();
  const [newTransfer, setNewTransfer] = useAtom(creditTransferAtom);
  const [session] = useAtom(sessionAtom);
  const [selfNation, setSelfNation] = useState<NationModel>(new NationModel());
  const [accounts, setAccounts] = useState<LabelId[]>([
    { id: session.user.officialId, label: session.user.name },
  ]);
  const [maxAmount, setMaxAmount] = useState(0);
  const modalRef = useModal(() => setNewTransfer(emptyCreditTransfert));

  useEffect(() => {
    const loadNation = async (nationOfficialId: string) => {
      const loadedNation = new NationModel();
      const nation = await loadedNation.loadNation(nationOfficialId);
      setSelfNation(nation);
    };
    if (
      session.user.citizenship.nationId != "" &&
      session.user.citizenship.nationOwner
    ) {
      loadNation(session.user.citizenship.nationId);
    }
  }, [session]);

  useEffect(() => {
    if (
      selfNation.officialId != "" &&
      selfNation.officialId != newTransfer.recipient.officialId
    ) {
      setAccounts([
        ...accounts,
        { id: selfNation.officialId, label: selfNation.name },
      ]);
    }
  }, [selfNation]);

  useEffect(() => {
    setMaxAmount(getMaxAMount(newTransfer.sender.officialId));
  }, [newTransfer]);

  const getMaxAMount = (officialId: string) => {
    if (officialId === session.user.officialId) {
      return session.user.credits;
    } else if (officialId === selfNation.officialId) {
      return selfNation.data.roleplay.treasury;
    } else {
      return 0;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.transferCredits"),
      actionToDo: async () => {
        if (newTransfer.sender.officialId === session.user.officialId) {
          await session.user.transferCredits(
            {
              recipientId: newTransfer.recipient.officialId,
              amount: newTransfer.amount,
            },
            newTransfer.sender.name,
            newTransfer.recipient.name,
            newTransfer.comment,
          );
        } else {
          await selfNation.transferCredits(
            {
              nationOwnerId: selfNation.owner,
              recipientId: newTransfer.recipient.officialId,
              amount: newTransfer.amount,
            },
            newTransfer.sender.name,
            newTransfer.recipient.name,
            newTransfer.comment,
          );
        }
      },
    });
    setNewTransfer(emptyCreditTransfert);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "amount") {
      if (e.target.value.charAt(0) === "0") {
        e.target.value = e.target.value.slice(1);
      }
      const amount = Number(e.target.value);
      setNewTransfer({
        ...newTransfer,
        amount: amount >= 0 && amount <= maxAmount ? amount : maxAmount,
      });
    } else {
      setNewTransfer({
        ...newTransfer,
        comment: e.target.value,
      });
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const maxAmount = getMaxAMount(e.target.value);
    setNewTransfer({
      ...newTransfer,
      sender: {
        officialId: e.target.value,
        name:
          e.target.value === session.user.officialId
            ? session.user.name
            : selfNation.name,
      },
      amount: maxAmount < newTransfer.amount ? maxAmount : newTransfer.amount,
    });
  };

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
