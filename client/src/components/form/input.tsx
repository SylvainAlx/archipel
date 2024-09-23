import { ChangeEvent } from "react";

export interface InputProps {
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  checked?: boolean;
  id?: string;
  maxLength?: number;
}

export default function Input({
  required,
  onChange,
  type,
  placeholder,
  value,
  checked,
  name,
  id,
  maxLength,
}: InputProps) {
  return (
    <input
      id={id && id}
      required={required}
      onChange={onChange}
      type={type}
      name={name}
      className="w-full max-w-[300px] rounded-lg p-4 pe-12 text-sm shadow-sm text-primary focus:ring-2 focus:ring-secondary outline-none"
      placeholder={placeholder}
      value={value}
      checked={checked != undefined && checked}
      maxLength={maxLength}
    />
  );
}
