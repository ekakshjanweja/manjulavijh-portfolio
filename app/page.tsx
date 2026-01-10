import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Coming Soon
        </h1>

        <p className="mt-4 max-w-xl text-muted-foreground">
          We’re working hard to bring something amazing. Stay tuned for updates!
        </p>

        <div className="mt-6">
          <Button variant="outline" disabled>
            Launching Soon 🚀
          </Button>
        </div>
      </main>
    </>
  );
}
