import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPhotosByCategory, fetchPhotosGrouped } from "@/lib/photos";

const updateMetadataSchema = z.object({
  id: z.string().uuid(),
  altText: z.string().optional(),
  description: z.string().optional(),
});

const uploadSchema = z.object({
  imageUrl: z.string().url(),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  altText: z.string().optional(),
  description: z.string().optional(),
});

export async function PATCH(request: Request) {
  const body = await request.json();
  const parsed = updateMetadataSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("photos")
    .update({
      alt_text: parsed.data.altText ?? null,
      description: parsed.data.description ?? null,
    })
    .eq("id", parsed.data.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = uploadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  let positionQuery = supabase
    .from("photos")
    .select("position")
    .eq("category", parsed.data.category)
    .order("position", { ascending: false })
    .limit(1);

  if (parsed.data.subcategory) {
    positionQuery = positionQuery.eq("subcategory", parsed.data.subcategory);
  } else {
    positionQuery = positionQuery.is("subcategory", null);
  }

  const { data: existing, error: existingError } = await positionQuery;

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }

  const nextPosition = (existing?.[0]?.position ?? 0) + 1;
  const { error } = await supabase.from("photos").insert({
    image_url: parsed.data.imageUrl,
    alt_text: parsed.data.altText ?? null,
    description: parsed.data.description ?? null,
    category: parsed.data.category,
    subcategory: parsed.data.subcategory ?? null,
    position: nextPosition,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

const deleteSchema = z.object({
  id: z.string().uuid(),
  storagePath: z.string().min(1),
});

export async function DELETE(request: Request) {
  const body = await request.json();
  const parsed = deleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { error: deleteError } = await supabase
    .from("photos")
    .delete()
    .eq("id", parsed.data.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  const { error: storageError } = await supabase.storage
    .from("portfolio-images")
    .remove([parsed.data.storagePath]);

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? undefined;
  const subcategory = url.searchParams.get("subcategory") ?? undefined;
  if (category && subcategory) {
    const photos = await fetchPhotosByCategory(
      category as "food" | "product" | "concept",
      subcategory,
    );
    return NextResponse.json({
      grouped: { [`${category}:${subcategory}`]: photos },
    });
  }

  const grouped = await fetchPhotosGrouped(category);
  return NextResponse.json({ grouped });
}
