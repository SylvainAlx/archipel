import { ChangeEvent } from "react";
import { MAX_LENGTH } from "../../settings/consts";

export interface TextAreaProps {
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  rows?: number;
}

export default function TextArea({
  required,
  onChange,
  name,
  placeholder,
  value,
  maxLength = MAX_LENGTH.text.textArea,
  rows,
}: TextAreaProps) {
  return (
    <textarea
      className="w-full h-full max-h-[50vh] rounded-lg p-4 pe-12 text-sm shadow-sm text-primary"
      onChange={onChange}
      required={required}
      name={name}
      placeholder={
        placeholder + (required ? " *" : "") + " (max " + maxLength + ")"
      }
      value={value}
      maxLength={maxLength}
      rows={rows}
    ></textarea>
  );
}
