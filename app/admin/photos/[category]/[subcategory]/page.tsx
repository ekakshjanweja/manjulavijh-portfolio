import Link from "next/link";
import { notFound } from "next/navigation";

import PhotoManager from "@/app/admin/photo-manager";
import {
  CATEGORY_LABELS,
  CATEGORY_SUBCATEGORIES,
  type PortfolioCategory,
} from "@/lib/portfolio-categories";
import { fetchPhotosByCategory } from "@/lib/photos";

export const dynamic = "force-dynamic";

export default async function AdminSubcategoryPhotosPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;

  if (!(category in CATEGORY_SUBCATEGORIES)) {
    notFound();
  }

  const allowed = CATEGORY_SUBCATEGORIES[category as "food" | "product"].some(
    (entry) => entry.slug === subcategory,
  );
  if (!allowed) {
    notFound();
  }

  const photos = await fetchPhotosByCategory(
    category as "food" | "product",
    subcategory,
  );
  const groupedPhotos = {
    [`${category}:${subcategory}`]: photos,
  };

  const subcategoryLabel =
    CATEGORY_SUBCATEGORIES[category as "food" | "product"].find(
      (entry) => entry.slug === subcategory,
    )?.label ?? subcategory;

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin Dashboard</p>
          <h1 className="text-2xl font-semibold text-slate-900">
            {CATEGORY_LABELS[category as PortfolioCategory]} · {subcategoryLabel}
          </h1>
          <p className="text-sm text-slate-500">
            Upload, delete, and reorder images in this subcategory.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/photos/${category}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Back to category
          </Link>
        </div>
      </header>

      <PhotoManager
        initialGroupedPhotos={groupedPhotos}
        fixedCategory={category as PortfolioCategory}
        fixedSubcategory={subcategory}
      />
    </section>
  );
}
