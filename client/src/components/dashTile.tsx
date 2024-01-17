import { DashTileProps } from "../types/typProp";

export default function DashTile({
  title,
  children,
  className,
}: DashTileProps) {
  return (
    <section
      className={`bg-complementary rounded p-4 flex flex-col items-center flex-grow gap-2 ${className && className}`}
    >
      <b>{title}</b>
      {children}
    </section>
  );
}
