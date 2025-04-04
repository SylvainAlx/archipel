import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  confirmBox,
  myStore,
  showCookiesModalAtom,
} from "../../../settings/store";
import { dateIsExpired } from "../../../utils/functions";
import { ConfirmBoxDefault } from "../../../types/typAtom";
import { resetCookieConsentValue } from "react-cookie-consent";
import { UserModel } from "../../../models/userModel";
import { useTranslation } from "react-i18next";

export default function useSettings(citizen: UserModel) {
  const { t } = useTranslation();
  const [userPlan, setUserPlan] = useState("free");
  const [showCookiesModal, setShowCookiesModal] = useAtom(showCookiesModalAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (citizen.plan != "free" && !dateIsExpired(citizen.expirationDate)) {
      setUserPlan(citizen.plan);
    } else {
      setUserPlan("free");
    }
  }, [citizen]);

  const handleDelete = () => {
    const payload = window.prompt(t("components.form.input.password"));
    if (payload) {
      myStore.set(confirmBox, {
        text: t("components.modals.confirmModal.deleteUser"),
        actionToDo: async () => {
          await citizen.baseDelete(payload);
          myStore.set(confirmBox, ConfirmBoxDefault);
          navigate("/");
        },
      });
    }
  };

  const handleCreateRecovery = () => {
    const payload = window.prompt(t("components.form.input.password"));
    if (payload) {
      myStore.set(confirmBox, {
        text: t("components.modals.confirmModal.createNewRecovery"),
        actionToDo: async () => {
          await citizen.createNewRecovery(payload);
          myStore.set(confirmBox, ConfirmBoxDefault);
        },
      });
    }
  };

  const resetCookiesConsent = () => {
    resetCookieConsentValue();
    setShowCookiesModal(true);
  };

  const logout = () => {
    myStore.set(confirmBox, {
      text: t("components.modals.confirmModal.logout"),
      actionToDo: () => {
        citizen.logout();
        navigate("/");
      },
    });
  };

  return {
    userPlan,
    handleDelete,
    handleCreateRecovery,
    resetCookiesConsent,
    logout,
    showCookiesModal,
    t,
  };
}
