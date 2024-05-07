export interface DashTileProps {
  title: string;
  children: JSX.Element;
  className?: string;
}

export default function DashTile({
  title,
  children,
  className,
}: DashTileProps) {
  return (
    <section
      className={`min-w-[300px] animate-fadeIn bg-complementary rounded p-2 flex flex-col items-center flex-grow gap-3 ${className && className}`}
    >
      <b>{title}</b>
      {children}
    </section>
  );
}
