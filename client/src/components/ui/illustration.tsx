interface IllustrationProps {
  src: string;
  alt: string;
}

export default function Illustration({ src, alt }: IllustrationProps) {
  return (
    <span className="animate-fade-down max-w-lg lg:max-w-[30%] rounded-3xl overflow-hidden shadow-lg shadow-complementary">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </span>
  );
}
