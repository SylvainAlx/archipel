import { useEffect, useState } from "react";
import { SelectProps } from "../../types/typProp";

export default function Select({
  required,
  options,
  value,
  onChange,
}: SelectProps) {
  const [updatedOptions, setUpdatedOptions] = useState(options);
  useEffect(() => {
    const update = [...updatedOptions];
    update.unshift({ id: -1, label: "- CHOISIR -" });
    setUpdatedOptions(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <select
      required={required}
      onChange={onChange}
      className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-primary capitalize"
      value={value}
    >
      {updatedOptions.map((option, i) => {
        return (
          <option key={i} value={option.id} label={option.label}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}
