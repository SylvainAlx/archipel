import { useAtom } from "jotai";
import { userAtom } from "../settings/store";
import { RxAvatar } from "react-icons/rx";

export default function Avatar() {
  const [user] = useAtom(userAtom);

  return (
    <div className="animate-fadeIn h-[80px] w-[80px] flex flex-col justify-center rounded-full overflow-hidden">
      {user.avatar != "" ? (
        <img
          src={user.avatar}
          className="cursor-pointer h-full w-full hover:animate-pulse"
        ></img>
      ) : (
        <div className="text-7xl flex items-center justify-center">
          <RxAvatar />
        </div>
      )}
    </div>
  );
}
