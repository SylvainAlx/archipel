import { Link } from "react-router-dom";

interface LinkButtonProps {
  text: string;
  path: string;
  // eslint-disable-next-line no-undef
  children?: JSX.Element;
  blank?: boolean;
}

export default function LinkButton({
  text,
  path,
  children,
  blank = true,
}: LinkButtonProps) {
  return (
    <Link
      to={path}
      target={blank ? "_blank" : undefined}
      className="px-5 flex gap-1 items-center justify-center flex-wrap bg-gradient-to-r from-secondary2 to-secondary hover:bg-gradient-to-br rounded-full"
    >
      <span className="text-sm">{children}</span>
      <span>{text}</span>
    </Link>
  );
}
