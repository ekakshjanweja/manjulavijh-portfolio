import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const uploadSchema = z.object({
  name: z.string().min(1),
  website: z.string().url().optional(),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/svg+xml", "image/png", "image/jpeg", "image/webp"];

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const name = formData.get("name");
  const website = formData.get("website");

  const parsed = uploadSchema.safeParse({
    name,
    website: typeof website === "string" ? website : undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const extension = file.name.split(".").pop() || "png";
  const path = `clients/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error: storageError } = await supabase.storage
    .from("portfolio-images")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage
    .from("portfolio-images")
    .getPublicUrl(path);

  const { data: existing } = await supabase
    .from("clients")
    .select("position")
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (existing?.[0]?.position ?? 0) + 1;

  const { error: insertError } = await supabase.from("clients").insert({
    id: crypto.randomUUID(),
    name: parsed.data.name,
    logo_url: publicUrl.publicUrl,
    website: parsed.data.website ?? null,
    position: nextPosition,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const clients = await import("@/lib/clients").then((m) => m.fetchAllClients());
  return NextResponse.json({ clients });
}