import { Navbar } from "@/app/components/navbar";
import ComingSoonHero from "./components/ComingSoonHero";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden">
        <Navbar />
        <ComingSoonHero />
      </main>
    </>
  );
}
