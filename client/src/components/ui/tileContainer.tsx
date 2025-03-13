interface TileContainerProps {
  // eslint-disable-next-line no-undef
  children: JSX.Element;
  bgColor?: string;
}

export default function TileContainer({
  children,
  bgColor,
}: TileContainerProps) {
  return (
    <section
      className={`w-full lg:w-[48%] min-w-[300px] p-1 flex flex-col gap-1 justify-center ${bgColor && bgColor}`}
    >
      {children}
    </section>
  );
}
