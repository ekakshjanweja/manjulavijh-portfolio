import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PortfolioCategory } from "@/lib/portfolio-categories";

export type Photo = {
  id: string;
  image_url: string;
  alt_text: string | null;
  description: string | null;
  category: string;
  subcategory: string | null;
  position: number;
  created_at: string;
};

function normalizePhotoUrl(imageUrl: string) {
  const marker = "/storage/v1/object/portfolio-images/";
  if (imageUrl.includes("/storage/v1/object/public/")) {
    return imageUrl;
  }
  if (imageUrl.includes(marker)) {
    return imageUrl.replace(marker, "/storage/v1/object/public/portfolio-images/");
  }
  return imageUrl;
}

function normalizePhotos(photos: Photo[]) {
  return photos.map((photo) => ({
    ...photo,
    image_url: normalizePhotoUrl(photo.image_url),
  }));
}

export async function fetchPhotosByCategory(
  category: PortfolioCategory,
  subcategory?: string,
): Promise<Photo[]> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("photos")
    .select("id, image_url, alt_text, description, category, subcategory, position, created_at")
    .eq("category", category)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (subcategory) {
    query = query.eq("subcategory", subcategory);
  } else {
    query = query.is("subcategory", null);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return normalizePhotos(data ?? []);
}

export async function fetchPhotoCover(
  category: PortfolioCategory,
  subcategory?: string,
): Promise<Photo | null> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("photos")
    .select("id, image_url, alt_text, description, category, subcategory, position, created_at")
    .eq("category", category)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(1);

  if (subcategory) {
    query = query.eq("subcategory", subcategory);
  } else {
    query = query.is("subcategory", null);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const photo = data?.[0] ?? null;
  if (!photo) {
    return null;
  }
  return {
    ...photo,
    image_url: normalizePhotoUrl(photo.image_url),
  };
}

export async function fetchPhotosGrouped(
  category?: string,
): Promise<Record<string, Photo[]>> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("photos")
    .select("id, image_url, alt_text, description, category, subcategory, position, created_at")
    .order("category", { ascending: true })
    .order("subcategory", { ascending: true, nullsFirst: true })
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const grouped: Record<string, Photo[]> = {};
  for (const photo of normalizePhotos(data ?? [])) {
    const key = `${photo.category}:${photo.subcategory ?? ""}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(photo);
  }

  return grouped;
}

export async function updatePhotoMetadata(
  id: string,
  altText: string | null,
  description: string | null
): Promise<void> {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("photos")
    .update({ alt_text: altText, description: description })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
