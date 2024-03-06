import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { DashboardTabProps } from "../types/typProp";
import { differenceEnMinutes } from "../utils/functions";
import { confirmBox, myStore, selectedNationAtom } from "../settings/store";
import { useAtom } from "jotai";

export default function Notification({ owner }: DashboardTabProps) {
  const [selectedNation] = useAtom(selectedNationAtom);
  const [showNotif, setShowNotif] = useState(false);
  const [totalReward, setTotalReward] = useState(0);
  const [notifs, setNotifs] = useState<string[]>([]);

  useEffect(() => {
    if (owner) {
      const reward = differenceEnMinutes(
        selectedNation.data.roleplay.lastUpdated,
      );
      if (reward > 0) {
        const bonus = Math.ceil(
          (reward * selectedNation.data.roleplay.points) / 10,
        );
        setTotalReward(reward + bonus);
        setNotifs(["Récupérer " + totalReward + " nouveau(x) crédit(s) ?"]);
      }
    }
  }, [owner, showNotif]);

  const updateNation = () => {
    const updatedNation = { ...selectedNation };
    updatedNation.data.roleplay.credits += totalReward;
    updatedNation.data.roleplay.lastUpdated = new Date();
    myStore.set(confirmBox, {
      action: "updateNation",
      text: notifs[0],
      result: "",
      target: "",
      payload: updatedNation,
    });
    setShowNotif(false);
  };

  return (
    <div className="relative">
      <div
        className="text-2xl cursor-pointer"
        onClick={() => setShowNotif(!showNotif)}
      >
        <MdNotifications />
      </div>
      {showNotif && (
        <div className="w-[200px] absolute top-[30px] left-3 z-100 bg-secondary p-1 rounded">
          {notifs.map((element, i) => {
            return (
              <div
                className="w-full cursor-pointer"
                key={i}
                onClick={updateNation}
              >
                {element}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
