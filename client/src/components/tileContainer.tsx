import { Props } from "../types/typProp";

export default function TileContainer({ children }: Props) {
  return (
    <section className="w-full flex flex-wrap gap-1 justify-center">
      {children}
    </section>
  );
}
