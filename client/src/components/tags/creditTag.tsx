import Tag from "./tag";
import { customTagProps } from "../../types/typProp";
import { FaCoins } from "react-icons/fa6";
import { addCredits } from "../../utils/functions";
// import { MdAddCircle } from "react-icons/md";

export default function CreditTag({ owner, label }: customTagProps) {
  return (
    <Tag
      text={label.toString()}
      bgColor="bg-info"
      children={
        <>
          <FaCoins />
          {owner && (
            <span className="text-2xl cursor-pointer" onClick={addCredits}>
              {/* <MdAddCircle /> */}
            </span>
          )}
        </>
      }
    />
  );
}
