import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const querySchema = z.object({
  category: z.string().min(1),
  subcategory: z.string().optional(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    category: url.searchParams.get("category") ?? "",
    subcategory: url.searchParams.get("subcategory") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("photos")
    .select("id, image_url, category, subcategory, position, created_at")
    .eq("category", parsed.data.category)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (parsed.data.subcategory) {
    query = query.eq("subcategory", parsed.data.subcategory);
  } else {
    query = query.is("subcategory", null);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}
