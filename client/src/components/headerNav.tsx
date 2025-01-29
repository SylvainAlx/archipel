import { NationModel } from "../models/nationModel";
import Nav from "./nav";

export default function HeaderNav({ nation }: { nation: NationModel }) {
  return (
    <nav
      className={`hidden transition-all duration-100 md:flex justify-center flex-wrap items-end gap-4`}
    >
      <Nav nation={nation} />
    </nav>
  );
}
