import { useAtom } from "jotai";
import Button from "../button";
import { imageAtom } from "../../settings/store";
import { GiBlackFlag } from "react-icons/gi";

export default function ImageModal() {
  const [image, setImage] = useAtom(imageAtom);
  return (
    <>
      <h2 className="text-2xl text-center p-4">DÉTAIL DE L'IMAGE</h2>
      <div
        className={`max-w-[90%] bg-complementary flex flex-col items-center justify-center overflow-hidden rounded`}
      >
        {image ? (
          <img
            src={image}
            alt={`flag of ${image}`}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-[3.1rem]">
            <GiBlackFlag />
          </div>
        )}
      </div>
      <Button path="" text="FERMER" click={() => setImage("")} />
    </>
  );
}
