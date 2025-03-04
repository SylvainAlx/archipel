import { MdHelp } from "react-icons/md";
import Button from "./button";
import { myStore, showHelpAtom } from "../../../settings/store";

export default function HelpButton() {
  return (
    <Button
      text=""
      children={
        <MdHelp className="flex items-center gap-1 hover:text-secondary transition-all" />
      }
      click={() => myStore.set(showHelpAtom, true)}
      bgColor="bg-invisible"
    />
  );
}
