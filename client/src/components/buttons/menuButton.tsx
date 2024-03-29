import { IoMenu } from "react-icons/io5";
import Button from "../button";
import { myStore, showMenuAtom } from "../../settings/store";

export default function MenuButton() {
  return (
    <>
      <div className={`md:hidden w-[30px] h-full`}>
        <Button
          text=""
          path=""
          children={
            <div className="flex items-center gap-1">
              <IoMenu />
            </div>
          }
          click={() => myStore.set(showMenuAtom, true)}
        />
      </div>
    </>
  );
}
