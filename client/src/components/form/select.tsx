import { ChangeEvent, useEffect, useState } from "react";
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
}

export default function Select({
  required,
  options,
  value,
  title,
  id,
  onChange,
}: SelectProps) {
  const { t } = useTranslation();
  const [updatedOptions, setUpdatedOptions] = useState(options);

  useEffect(() => {
    const update = [...updatedOptions];
    update.unshift({ id: -1, label: t("components.form.select.choose") });
    setUpdatedOptions(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <label className="w-full">
      {title}
      <select
        required={required}
        onChange={onChange}
        className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-primary capitalize"
        value={value}
        id={id && id}
      >
        {updatedOptions.map((option, i) => {
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
