import Button from "./button";
import { handleShare } from "../../../utils/procedures";
import { RiShareBoxFill } from "react-icons/ri";

export default function ShareButton({ label }: { label: string }) {
  return (
    <Button text="" click={() => handleShare(label)} bgColor="bg-invisible">
      <RiShareBoxFill className="text-3xl text-secondary" />
    </Button>
  );
}
