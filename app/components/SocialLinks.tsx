import { InstagramIcon } from "@/components/ui/svgs/instagramIcon";
import { Behance } from "@/icons/index";

export default function SocialLinks() {
  return (
    <div className="mt-8 flex items-center justify-center gap-6">
      <a
        href="https://www.instagram.com/manjulavijhphotography/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition"
      >
        <InstagramIcon className="h-7 w-7" />
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
