import { useAtom } from "jotai";
import Button from "../buttons/button";
import { imageAtom } from "../../settings/store";
import { GiBlackFlag } from "react-icons/gi";

export default function ImageModal() {
  const [image, setImage] = useAtom(imageAtom);
  return (
    <>
      <div
        className={`max-w-[60%] bg-complementary flex flex-col items-center justify-center overflow-hidden rounded`}
      >
        {image ? (
          <img src={image} alt={image} className="object-cover w-full h-full" />
        ) : (
          <div className="text-[3.1rem]">
            <GiBlackFlag />
          </div>
        )}
      </div>
      <Button text="FERMER" click={() => setImage("")} />
    </>
  );
}
