import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { DashboardTabProps } from "../types/typProp";
import { differenceEnMinutes } from "../utils/functions";
import { confirmBox, myStore, selectedNationAtom } from "../settings/store";
import { useAtom } from "jotai";

export default function Notification({ text }: DashboardTabProps) {
  const [selectedNation] = useAtom(selectedNationAtom);
  const [totalReward, setTotalReward] = useState(0);

  useEffect(() => {

      const reward = differenceEnMinutes(
        selectedNation.data.roleplay.lastUpdated,
      );
      if (reward > 0) {
        const bonus = Math.ceil(
          (reward * selectedNation.data.roleplay.points) / 10,
        );
        setTotalReward(reward + bonus);
      } else {
        setTotalReward(0);
      }
    
  }, [
    selectedNation.data.roleplay.lastUpdated,
    selectedNation.data.roleplay.points,
    totalReward,
  ]);

  const updateNation = () => {
    const updatedNation = { ...selectedNation };
    updatedNation.data.roleplay.credits += totalReward;
    updatedNation.data.roleplay.lastUpdated = new Date();
    myStore.set(confirmBox, {
      action: "updateNation",
      text: "Récupérer " + totalReward + " nouveau(x) crédit(s) ?",
      result: "",
      target: "",
      payload: updatedNation,
    });
  };

  return (
    <div
      className="p-2 relative md:bg-complementary cursor-pointer"
      onClick={() => totalReward > 0 && updateNation()}
    >
      <div className="relative text-5xl md:text-2xl">
        <MdNotifications />
        {totalReward > 0 && (
          <div className="absolute top-0 left-0 w-[15px] h-[15px] bg-danger rounded-full text-[12px] flex justify-center items-center">
            <div>{text}</div>
          </div>
        )}
      </div>
    </div>
  );
}
