import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/portfolio-categories";

export const dynamic = "force-dynamic";

export default function AdminPhotosIndexPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin Dashboard</p>
          <h1 className="text-2xl font-semibold text-slate-900">Manage Galleries</h1>
          <p className="text-sm text-slate-500">
            Choose a category to upload, reorder, or delete images.
          </p>
        </div>
        <Link
          href="/admin"
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          View messages
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {(
          Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>
        ).map((category) => (
          <Link
            key={category}
            href={`/admin/photos/${category}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              {CATEGORY_LABELS[category]}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Manage images for {CATEGORY_LABELS[category].toLowerCase()}.
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
