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
      className={`relative min-w-[300px] animate-fadeIn rounded px-2 pt-4 pb-6 flex flex-col items-center flex-grow gap-3 ${className && className}`}
    >
      <div className="absolute h-1 inset-0 pointer-events-none border-t border-b border-transparent customGradient"></div>
      {title != "" && (
        <legend className="px-2 text-center text-light bold">{title}</legend>
      )}
      {children}
    </fieldset>
  );
}
