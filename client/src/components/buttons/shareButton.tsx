import Button from "./button";
import { handleShare } from "../../utils/procedures";
import { RiShareBoxFill } from "react-icons/ri";

export default function ShareButton({ label }: { label: string }) {
  return (
    <Button
      text=""
      children={<RiShareBoxFill className="text-3xl text-secondary" />}
      click={() => handleShare(label)}
      bgColor="bg-invisible"
    />
  );
}
