import { InstagramIcon } from "../ui/svgs/instagramIcon";

export default function SocialLinks() {
  return (
    <a
      href="https://www.instagram.com/manjulavijhphotography/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-foreground transition"
    >
      <InstagramIcon className="h-7 w-7" />
    </a>
  );
}
