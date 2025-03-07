import { useAtom } from "jotai";
import {
  confirmBox,
  creditTransferAtom,
  myStore,
  sessionAtom,
} from "../../settings/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NationModel } from "../../models/nationModel";
import { LabelId } from "../../types/typNation";
import { emptyCreditTransfert } from "../../types/typAtom";
import { useTranslation } from "react-i18next";

export function useCreditTransferModal() {
  const { t } = useTranslation();
  const [newTransfer, setNewTransfer] = useAtom(creditTransferAtom);
  const [session] = useAtom(sessionAtom);
  const [selfNation, setSelfNation] = useState<NationModel>(new NationModel());
  const [accounts, setAccounts] = useState<LabelId[]>([
    { id: session.user.officialId, label: session.user.name },
  ]);
  const [maxAmount, setMaxAmount] = useState(0);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selfNation]);

  useEffect(() => {
    setMaxAmount(getMaxAMount(newTransfer.sender.officialId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return {
    selfNation,
    session,
    newTransfer,
    accounts,
    setNewTransfer,
    handleSubmit,
    handleChange,
    handleSelectChange,
    t,
  };
}
