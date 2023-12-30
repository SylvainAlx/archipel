import { NumberProps } from "../types/typProp";

export default function Points({ text }: NumberProps) {
  return (
    <div className="rounded-full text-md bg-secondary text-center py-1 px-2">
      {text} N
    </div>
  );
}
