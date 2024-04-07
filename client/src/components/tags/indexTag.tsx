import { NumberProps } from "../../types/typProp";
import Tag from "./tag";

export default function IndexTag({ text }: NumberProps) {
  return (
    <div className="absolute bottom-2 left-2 shadow-md">
      <Tag text={(text + 1).toString()} bgColor="bg-black_alpha" />
    </div>
  );
}
