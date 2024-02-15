import { Props } from "../../types/typProp";

export default function ModalContainer({ children }: Props) {
  return (
    <div className="animate-in fade-in z-20 fixed top-0 w-[100%] h-[100%] backdrop-blur-sm bg-black_alpha flex items-center justify-center">
      <div className="w-[350px] bg-slate-800 rounded-md p-6 flex flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}
