import { Props } from "../types/typProp";

export default function ListTile({ children }: Props) {
  return (
    <div className="flex flex-col-reverse items-center gap-4 rounded flex-grow">
      {children}
    </div>
  );
}
