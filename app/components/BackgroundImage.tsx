import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/coming-soon-bg.png"
        alt="Photography background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute  inset-0 bg-black/60" />
    </div>
  );
}
