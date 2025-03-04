import { useTranslation } from "react-i18next";
import Button from "../ui/buttons/button";
import { RxReset } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";

interface SearchButtonsProps {
  reset: () => void;
}

export default function SearchButtons({ reset }: SearchButtonsProps) {
  const { t } = useTranslation();
  return (
    <div className="pb-2 flex flex-wrap gap-2 items-center justify-center md:justify-end">
      <div className="w-[150px] flex justify-center">
        <Button
          type="submit"
          disabled={false}
          text={t("components.buttons.search")}
          children={<IoSearchSharp />}
        />
      </div>
      <div className="w-[150px] flex justify-center">
        <Button
          type="button"
          disabled={false}
          text={t("components.buttons.reset")}
          click={reset}
          children={<RxReset />}
        />
      </div>
    </div>
  );
}
