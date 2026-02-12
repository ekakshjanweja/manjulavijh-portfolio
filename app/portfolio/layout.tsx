import { FooterSection } from "@/components/portfolio/footer-section";
import { NavbarSection } from "@/components/portfolio/navbar-section";
import { Toaster } from "sonner";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full max-w-[100vw] overflow-x-hidden">
        <NavbarSection />
        <main className="flex-1">{children}</main>
        <FooterSection />
        <Toaster richColors position="top-right" />
      </div>
    </>
  );
}
