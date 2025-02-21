import { FormEvent } from "react";

export interface FormProps {
  children: JSX.Element;
  title?: string;
  submit: (event: FormEvent) => void;
  background?: boolean;
}

export default function Form({
  children,
  title,
  submit,
  background,
}: FormProps) {
  return (
    <form
      className={`w-[300px] p-2 rounded ${background && "bg-complementary"} flex flex-col gap-4 items-center justify-between`}
      onSubmit={submit}
    >
      {title && <legend className="text-center">{title}</legend>}
      {children}
    </form>
  );
}
