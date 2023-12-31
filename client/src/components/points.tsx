import { NumberProps } from "../types/typProp";

export default function Points({ text }: NumberProps) {
  return (
    <div className="rounded text-[0.8rem] bg-secondary text-center px-2 self-end">
      {text} points
    </div>
  );
}
