import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export interface SelectProps {
  required?: boolean;
  options: Array<{
    id: number | string;
    label: string;
    color?: string;
  }>;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
  id?: string;
  label?: string;
}

export default function Select({
  required,
  options,
  value,
  id,
  title,
  onChange,
}: SelectProps) {
  const { t } = useTranslation();

  return (
    <label className="w-full max-w-[300px]">
      {title ? title.toLocaleUpperCase() : t("components.form.select.choose")}
      {required && " *"}
      <select
        required={required}
        onChange={onChange}
        className={`w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-primary capitalize outline-none focus:ring-2 focus:ring-secondary`}
        value={value}
        id={id && id}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option.id} label={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
    </label>
  );
}
