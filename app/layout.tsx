import type { Metadata } from "next";
import { Geist, Tangerine, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import "./globals.css";
import { Navbar } from "@/components/common/navbar";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <div>
              {/* TODO: Enable Navbar later */}
              {/* <Navbar /> */}
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
