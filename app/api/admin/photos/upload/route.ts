import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const uploadSchema = z.object({
  category: z.string().min(1),
  subcategory: z.string().optional(),
  altText: z.string().optional(),
  description: z.string().optional(),
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const category = formData.get("category");
  const subcategory = formData.get("subcategory");
  const altText = formData.get("altText");
  const description = formData.get("description");

  const parsed = uploadSchema.safeParse({
    category,
    subcategory: typeof subcategory === "string" ? subcategory : undefined,
    altText: typeof altText === "string" ? altText : undefined,
    description: typeof description === "string" ? description : undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const extension = file.name.split(".").pop() || "jpg";
  const subcategoryPath =
    parsed.data.category === "concept" ? "root" : parsed.data.subcategory || "root";
  const path = `${parsed.data.category}/${subcategoryPath}/${Date.now()}-${
    crypto.randomUUID()
  }.${extension}`;

  const { error: storageError } = await supabase.storage
    .from("portfolio-images")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage
    .from("portfolio-images")
    .getPublicUrl(path);

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
  const { error: insertError } = await supabase.from("photos").insert({
    id: crypto.randomUUID(),
    image_url: publicUrl.publicUrl,
    alt_text: parsed.data.altText ?? null,
    description: parsed.data.description ?? null,
    category: parsed.data.category,
    subcategory: parsed.data.subcategory ?? null,
    position: nextPosition,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
