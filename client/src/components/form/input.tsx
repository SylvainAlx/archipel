import { InputProps } from "../../types/typProp"

export default function Input({required, onChange, type, placeholder, value, name}: InputProps){

    return (
        <input
          required={required}
          onChange={onChange}
          type={type}
          name={name}
          className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
          placeholder={placeholder}
          value={value}
        />
    )
}