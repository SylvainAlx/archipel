import { IoDiamondOutline } from "react-icons/io5";
import DashTile from "../dashTile";
import ReportedFlag from "../reportedFlag";
import DateTag from "../tags/dateTag";
import PlanButton from "../buttons/planButton";
import { errorMessage } from "../../utils/toasts";
import Button from "../buttons/button";
import {
  changePasswordModalAtom,
  confirmBox,
  myStore,
  sessionAtom,
  showCookiesModalAtom,
} from "../../settings/store";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCookieBite } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import CrossButton from "../buttons/crossButton";
import { useTranslation } from "react-i18next";
import { User } from "../../types/typUser";
import { useAtom } from "jotai";
import { resetCookieConsentValue } from "react-cookie-consent";
import { useEffect, useState } from "react";
import { dateIsExpired } from "../../utils/functions";
import CookiesModal from "../modals/cookiesModal";

interface SettingsProps {
  citizen: User;
}

export default function Settings({ citizen }: SettingsProps) {
  const { t } = useTranslation();
  const [session] = useAtom(sessionAtom);
  const [userPlan, setUserPlan] = useState("free");
  const [showCookiesModal, setShowCookiesModal] = useAtom(showCookiesModalAtom);

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
        action: "deleteUser",
        text: t("components.modals.confirmModal.deleteUser"),
        payload,
        result: "",
      });
    }
  };

  const resetCookiesConsent = () => {
    resetCookieConsentValue();
    setShowCookiesModal(true);
  };

  const logout = () => {
    myStore.set(confirmBox, {
      action: "logout",
      text: t("components.modals.confirmModal.logout"),
      result: "",
    });
  };

  return (
    <>
      <DashTile
        title={t("pages.citizen.settings")}
        children={
          <>
            {session.user.reported && <ReportedFlag />}
            {userPlan != "free" && (
              <div className="px-2 flex gap-1 items-center bg-gold rounded text-primary bold">
                <IoDiamondOutline />
                <span>
                  {userPlan === "premium"
                    ? t("pages.citizen.plans.premium")
                    : t("pages.citizen.plans.elite")}
                </span>
                <DateTag date={citizen.expirationDate} due={true} />
              </div>
            )}
            <div className="w-full flex flex-wrap gap-2 justify-center">
              {userPlan === "free" && (
                <PlanButton
                  click={() =>
                    errorMessage(t("toasts.user.subscriptionNotReady"))
                  }
                />
              )}
              <Button
                text={t("components.buttons.changePassword")}
                click={() => myStore.set(changePasswordModalAtom, true)}
                children={<RiLockPasswordFill />}
              />
              <Button
                text={t("components.buttons.cookiesConsent")}
                click={resetCookiesConsent}
                children={<FaCookieBite />}
              />
            </div>
            <div className="w-full flex flex-wrap gap-2 justify-center">
              <Button
                text={t("components.buttons.logout")}
                bgColor="bg-danger"
                click={logout}
                children={<IoMdLogOut />}
              />
              <CrossButton
                text={t("components.buttons.deleteAccount")}
                click={handleDelete}
              />
            </div>
          </>
        }
      />
      {showCookiesModal && <CookiesModal />}
    </>
  );
}
