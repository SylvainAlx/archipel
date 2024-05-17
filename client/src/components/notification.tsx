import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { differenceEnMinutes } from "../utils/functions";
import { confirmBox, myStore, session } from "../settings/store";

export interface NotificationProps {
  text?: string;
  owner?: boolean;
}

export default function Notification({ text }: NotificationProps) {
  const [totalReward, setTotalReward] = useState(0);

  useEffect(() => {
    const reward = differenceEnMinutes(
      session.nation.data.roleplay.lastUpdated,
    );
    if (reward > 0) {
      const bonus = Math.ceil(
        (reward * session.nation.data.roleplay.points) / 10,
      );
      setTotalReward(reward + bonus);
    } else {
      setTotalReward(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    session.nation.data.roleplay.lastUpdated,
    session.nation.data.roleplay.points,
    totalReward,
  ]);

  const updateNation = () => {
    const updatedNation = { ...session.nation };
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
      className={`p-2 relative md:bg-complementary ${totalReward > 0 && "cursor-pointer hover:animate-pulse"}`}
      onClick={() => totalReward > 0 && updateNation()}
    >
      <div className="relative text-5xl md:text-2xl">
        <MdNotifications />
        {totalReward > 0 && (
          <div className="animate-ping absolute top-0 left-0 w-[20px] h-[20px] md:w-[15px] md:h-[15px] bg-danger rounded-full text-lg md:text-[12px] flex justify-center items-center">
            <div>{text}</div>
          </div>
        )}
      </div>
    </div>
  );
}
