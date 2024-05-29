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
    <fieldset
      className={`min-w-[300px] animate-fadeIn rounded p-2 flex flex-col items-center flex-grow gap-3 border-[1px] border-solid border-complementary2 ${className && className}`}
    >
      {title != "" && (
        <legend className="px-2 text-center text-light">{title}</legend>
      )}
      {children}
    </fieldset>
  );
}
