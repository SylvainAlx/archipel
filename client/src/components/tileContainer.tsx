import { Props } from "../types/typProp";

export default function TileContainer({ children }: Props) {
  return (
    <section className="w-full lg:w-[40%] min-w-[300px] p-1 flex flex-wrap gap-1 justify-center">
      {children}
    </section>
  );
}
