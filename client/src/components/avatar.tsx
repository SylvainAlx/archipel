import { StringProps } from "../types/typProp";


export default function Avatar({ text }: StringProps) {
  return (
    <div className="rounded-full w-[100px] h-[100px] p-2 border-2 overflow-hidden">
      <img
        src={text}
        className={`w-full h-full ${text === "/logo.png" && "opacity-20"}`}
      />
    </div>
  );
}
