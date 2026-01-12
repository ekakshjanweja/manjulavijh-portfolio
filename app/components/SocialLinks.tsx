import { Instagram, Behance } from "@/icons/index";

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-6 pt-4 text-white/60">
      <a
        href="https://www.instagram.com/manjulavijhphotography/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition"
      >
        <Instagram />
      </a>
      <a
        href="https://www.behance.net/manjulavijh1"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition"
      >
        <Behance />
      </a>
    </div>
  );
}
