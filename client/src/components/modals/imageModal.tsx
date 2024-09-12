import { useAtom } from "jotai";
import Button from "../buttons/button";
import { imageAtom } from "../../settings/store";
import { GiBlackFlag } from "react-icons/gi";
import { useEffect, useState } from "react";
import { getCachedImage } from "../../utils/functions";
import { useTranslation } from "react-i18next";

export default function ImageModal() {
  const [image, setImage] = useAtom(imageAtom);
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (image) {
      getCachedImage(image).then(setCachedImage);
    }
  }, [image]);

  return (
    <>
      <div
        className={`max-w-[40%] bg-complementary flex flex-col items-center justify-center overflow-hidden rounded`}
      >
        {image ? (
          cachedImage != null ? (
            <img
              src={cachedImage}
              alt={image}
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src={image}
              alt={image}
              className="object-cover w-full h-full"
            />
          )
        ) : (
          <div className="text-[3.1rem]">
            <GiBlackFlag />
          </div>
        )}
      </div>
      <Button text={t("components.buttons.close")} click={() => setImage("")} />
    </>
  );
}
