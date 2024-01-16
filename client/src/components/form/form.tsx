import { FormProps } from "../../types/typProp";

export default function Form ({children, title, submit} : FormProps) {
    return (
        <form className="w-[300px] p-2 m-4 rounded bg-complementary" onSubmit={submit}>
            <fieldset className="flex flex-col gap-4 items-center justify-between">
                <legend className="text-center">{title}</legend>
            {children}
            </fieldset>
        </form>
    )
}