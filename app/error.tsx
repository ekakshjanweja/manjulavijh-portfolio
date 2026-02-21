"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-16">
      <h1 className="font-serif text-3xl md:text-4xl mb-4">
        Something went wrong
      </h1>
      <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
        A client-side error occurred. Please try again or refresh the page.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-none border border-border/60 text-sm hover:border-accent/50 hover:bg-accent/10 transition"
      >
        Try again
      </button>
    </div>
  );
}
