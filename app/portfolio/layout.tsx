import { Navbar } from "@/components/portfolio/navbar";
import { Toaster } from "sonner";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Navbar />
        {children}
        <Toaster richColors position="top-right" />
      </div>
    </>
  );
}
