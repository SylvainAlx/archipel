import { Props } from "../types/typProp";

export default function ListTile({children}: Props){
    return (
        <div className="w-[300px] md:w-full relative bg-complementary flex flex-col items-center p-2 gap-4 rounded">
            {children}
        </div>
    )
}