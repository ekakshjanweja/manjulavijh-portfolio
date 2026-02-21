import type { Metadata } from "next";
import { Geist, Tangerine, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import "./globals.css";
import { NavbarSection } from "@/components/portfolio/navbar-section";
import { FooterSection } from "@/components/portfolio/footer-section";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Manjula Vijh",
  description: "Food & Product Photographer based in New Delhi.",
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/favicon.svg", type: "image/svg+xml" },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geist.variable} ${tangerine.variable} ${playfair.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full max-w-[100vw] overflow-x-hidden">
              <NavbarSection />
              <main className="flex-1">{children}</main>
              <FooterSection/>
              <Toaster richColors position="top-right" />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
// import { FooterSection } from "@/components/portfolio/footer-section";
// import { NavbarSection } from "@/components/portfolio/navbar-section";
// import { Toaster } from "sonner";

// export default function PortfolioLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <div className="w-full max-w-[100vw] overflow-x-hidden">
//         <NavbarSection />
//         <main className="flex-1">{children}</main>
//         <FooterSection />
//         <Toaster richColors position="top-right" />
//       </div>
//     </>
//   );
// }
