interface IllustrationProps {
  src: string;
}

export default function Illustration({ src }: IllustrationProps) {
  return (
    <span className="animate-fade-down max-w-[600px] lg:max-w-[30%] rounded-3xl overflow-hidden shadow-lg shadow-complementary">
      <img src={src} className="w-full h-full object-cover" />
    </span>
  );
}
