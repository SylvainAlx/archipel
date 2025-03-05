import { IoMenu } from "react-icons/io5";
import Button from "./button";
import { myStore, showMenuAtom } from "../../../settings/store";

export default function MenuButton() {
  return (
    <div className={`md:hidden h-full hover:text-secondary`}>
      <Button
        text=""
        click={() => myStore.set(showMenuAtom, true)}
        bgColor="bg-invisible"
      >
        <IoMenu className="text-5xl flex items-center gap-1" />
      </Button>
    </div>
  );
}
