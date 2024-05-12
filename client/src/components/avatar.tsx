import { RxAvatar } from "react-icons/rx";

export interface AvatarProps {
  url: string;
}

export default function Avatar({ url }: AvatarProps) {
  return (
    <div className="animate-fadeIn h-[80px] w-[80px] flex flex-col justify-center rounded-full overflow-hidden">
      {url != "" ? (
        <img
          src={url}
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
