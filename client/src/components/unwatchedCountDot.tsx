export default function UnwatchedCountDot({ count }: { count: number }) {
  return count > 0 ? (
    <div className="absolute z-30 w-4 h-4 top-0 right-0 bg-danger text-light text-[11px] rounded-full flex items-center justify-center animate-pulse">
      {count}
    </div>
  ) : (
    <></>
  );
}
