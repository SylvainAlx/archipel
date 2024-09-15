import { IoMenu } from "react-icons/io5";
import Button from "./button";
import { myStore, showMenuAtom } from "../../settings/store";

export default function MenuButton() {
  return (
    <>
      <div className={`md:hidden h-full`}>
        <Button
          text=""
          children={
            <div className="flex items-center gap-1">
              <IoMenu />
            </div>
          }
          click={() => myStore.set(showMenuAtom, true)}
          bgColor="bg-invisible"
        />
      </div>
    </>
  );
}
