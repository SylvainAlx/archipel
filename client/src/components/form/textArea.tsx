import { TextAreaProps } from "../../types/typProp";

export default function TextArea({
  required,
  onChange,
  name,
  placeholder,
  value,
  maxLength,
  rows,
}: TextAreaProps) {
  return (
    <textarea
      className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
      onChange={onChange}
      required={required}
      name={name}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      rows={rows}
    ></textarea>
  );
}
