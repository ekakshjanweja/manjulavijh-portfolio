import { Navbar } from "@/components/portfolio/navbar";
import { Toaster } from "sonner";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full max-w-[100vw] overflow-x-hidden">
        <Navbar />
        {children}
        <Toaster richColors position="top-right" />
      </div>
    </>
  );
}
