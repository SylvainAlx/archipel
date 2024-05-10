import { ChangeEvent } from "react";

export interface InputProps {
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  id?: string;
  maxLength?: number;
}

export default function Input({
  required,
  onChange,
  type,
  placeholder,
  value,
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
      className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm text-primary"
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
    />
  );
}
