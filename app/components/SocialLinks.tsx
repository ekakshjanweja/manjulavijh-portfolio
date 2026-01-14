import { InstagramIcon } from "@/components/ui/svgs/instagramIcon";

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
    </div>
  );
}
