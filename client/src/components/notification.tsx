import { MdNotifications } from "react-icons/md";

export interface NotificationProps {
  active: boolean;
  text?: string;
  owner?: boolean;
}

export default function Notification({ active, text }: NotificationProps) {
  return (
    <div
      className={`p-2 relative ${active && "cursor-pointer hover:animate-pulse"}`}
      onClick={() => active && console.log("notification")}
    >
      <div className="relative text-5xl md:text-2xl">
        <MdNotifications />
        {active && (
          <div className="animate-pulse absolute top-0 left-0 w-[20px] h-[20px] md:w-[15px] md:h-[15px] bg-danger rounded-full text-lg md:text-[12px] flex justify-center items-center">
            <div>{text}</div>
          </div>
        )}
      </div>
    </div>
  );
}
