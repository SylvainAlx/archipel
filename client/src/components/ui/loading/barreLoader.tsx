import { BarLoader } from "react-spinners";

export default function BarreLoader() {
  return (
    <div className="w-full h-10 flex flex-col items-center justify-center overflow-hidden">
      <BarLoader color="rgb(0, 129, 138)" width={600} />
    </div>
  );
}
