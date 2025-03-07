import { useTranslation } from "react-i18next";
import Input from "./input";
import { ChangeEvent } from "react";

interface BooleanRadioProps {
  title: string;
  value: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function BooleanRadio({
  title,
  value,
  name,
  onChange,
}: BooleanRadioProps) {
  const { t } = useTranslation();
  return (
    <fieldset className="w-full p-2 flex flex-wrap justify-center items-center gap-2 rounded border-[1px] border-light">
      <legend>{title}</legend>
      <label className="flex gap-1">
        {t("components.form.boolean.yes")}
        <Input type="radio" name={name} checked={value} onChange={onChange} />
      </label>
      <label className="flex gap-1">
        {t("components.form.boolean.no")}
        <Input type="radio" name={name} checked={!value} onChange={onChange} />
      </label>
    </fieldset>
  );
}
