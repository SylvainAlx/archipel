import { SelectProps } from "../../types/typProp";

export default function Select({
  required,
  options,
  onChange,
  value,
}: SelectProps) {
  return (
    <select
      required={required}
      onChange={onChange}
      className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-primary"
      value={value}
    >
      {options.map((option, i) => {
        return <option key={i} value={option.id}>{option.label}</option>;
      })}
    </select>
  );
}
