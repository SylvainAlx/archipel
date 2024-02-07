import { DashTileProps } from "../types/typProp";

export default function DashTile({
  title,
  children,
  className,
}: DashTileProps) {
  return (
    <section
      className={`min-w-[40%] animate-fadeIn bg-complementary rounded py-2 flex flex-col items-center flex-grow gap-3 ${className && className}`}
    >
      <b>{title}</b>
      {children}
    </section>
  );
}
