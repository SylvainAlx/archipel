import { useAtom } from "jotai";
import Button from "../../components/buttons/button";
import { imageAtom } from "../../settings/store";
import { GiBlackFlag } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { useModal } from "../../hooks/useModal";

export default function ImageModal() {
  const [image, setImage] = useAtom(imageAtom);
  const { t } = useTranslation();
  const modalRef = useModal(() => setImage(""));

  return (
    <div
      className="flex flex-col items-center gap-4"
      ref={modalRef}
      tabIndex={-1}
    >
      <a
        className={`max-w-screen-sm max-h-screen bg-complementary flex flex-col items-center justify-center overflow-hidden rounded cursor-zoom-in`}
        href={image}
        target="_blank"
      >
        {image ? (
          <img
            src={image}
            alt={image}
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-[3.1rem]">
            <GiBlackFlag />
          </div>
        )}
      </a>
      <Button text={t("components.buttons.close")} click={() => setImage("")} />
    </div>
  );
}
