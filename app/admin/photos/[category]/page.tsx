import Link from "next/link";
import { notFound } from "next/navigation";

import PhotoManager from "@/app/admin/photo-manager";
import {
  CATEGORY_LABELS,
  CATEGORY_SUBCATEGORIES,
  type PortfolioCategory,
} from "@/lib/portfolio-categories";
import { fetchPhotosGrouped } from "@/lib/photos";

export const dynamic = "force-dynamic";

export default async function AdminCategoryPhotosPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!(category in CATEGORY_LABELS)) {
    notFound();
  }

  const subcategories =
    category === "food" || category === "product"
      ? CATEGORY_SUBCATEGORIES[category]
      : [];

  const groupedPhotos =
    subcategories.length === 0 ? await fetchPhotosGrouped(category) : {};

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin Dashboard</p>
          <h1 className="text-2xl font-semibold text-slate-900">
            {CATEGORY_LABELS[category as PortfolioCategory]} Gallery
          </h1>
          <p className="text-sm text-slate-500">
            {subcategories.length > 0
              ? "Select a subcategory to manage its gallery content."
              : "Manage gallery content for this category."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin"
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            View messages
          </Link>
        </div>
      </header>

      {subcategories.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/admin/photos/${category}/${subcategory.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 transition hover:border-slate-300"
            >
              {subcategory.label}
            </Link>
          ))}
        </div>
      ) : (
        <PhotoManager
          initialGroupedPhotos={groupedPhotos}
          fixedCategory={category as PortfolioCategory}
        />
      )}
    </section>
  );
}
