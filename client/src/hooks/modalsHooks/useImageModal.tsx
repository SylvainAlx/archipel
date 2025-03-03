import { useAtom } from "jotai";
import { imageAtom } from "../../settings/store";

export function useImageModal() {
  const [image, setImage] = useAtom(imageAtom);
  return {
    image,
    setImage,
  };
}
