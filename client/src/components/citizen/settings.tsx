import { IoDiamondOutline } from "react-icons/io5";
import DashTile from "../ui/dashTile";
import ReportedFlag from "../ui/reportedFlag";
import DateTag from "../ui/tags/dateTag";
import Button from "../ui/buttons/button";
import {
  changePasswordModalAtom,
  confirmBox,
  myStore,
  showCookiesModalAtom,
} from "../../settings/store";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCookieBite, FaKey } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import CrossButton from "../ui/buttons/crossButton";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { resetCookieConsentValue } from "react-cookie-consent";
import { useEffect, useState } from "react";
import { dateIsExpired } from "../../utils/functions";
import CookiesModal from "../../views/modals/cookiesModal";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../models/userModel";
import { ConfirmBoxDefault } from "../../types/typAtom";

interface SettingsProps {
  citizen: UserModel;
}

export default function Settings({ citizen }: SettingsProps) {
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

  return (
    <>
      <DashTile title={t("pages.citizen.settings")}>
        <>
          {citizen.reported && <ReportedFlag />}
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
            {/* {userPlan === "free" && (
                <PlanButton
                  click={() =>
                    errorMessage(t("toasts.errors.subscriptionNotReady"))
                  }
                />
              )} */}
            <Button
              text={t("components.buttons.changePassword")}
              click={() => myStore.set(changePasswordModalAtom, true)}
            >
              <RiLockPasswordFill />
            </Button>
            <Button
              text={t("components.buttons.createNewRecovery")}
              click={handleCreateRecovery}
            >
              <FaKey />
            </Button>
            <Button
              text={t("components.buttons.cookiesConsent")}
              click={resetCookiesConsent}
            >
              <FaCookieBite />
            </Button>
          </div>
          <div className="w-full flex flex-wrap gap-2 justify-center">
            <Button
              text={t("components.buttons.logout")}
              bgColor="bg-danger"
              click={logout}
            >
              <IoMdLogOut />
            </Button>
            <CrossButton
              text={t("components.buttons.deleteAccount")}
              click={handleDelete}
            />
          </div>
        </>
      </DashTile>
      {showCookiesModal && <CookiesModal />}
    </>
  );
}
