import Image from "next/image";

export default function HeroImageCarousel() {
  return (
    <div className="flex-1 relative">
      <Image
        src="/images/coming-soon-bg.png"
        alt="Description"
        fill
        className="object-cover"
      />
    </div>
  );
}
