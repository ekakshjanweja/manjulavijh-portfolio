import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const reorderSchema = z.object({
  updates: z.array(
    z.object({
      id: z.string().uuid(),
      position: z.number().int().min(1),
    }),
  ),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reorderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const updates = parsed.data.updates;

  const results = await Promise.all(
    updates.map((update) =>
      supabase
        .from("photos")
        .update({ position: update.position })
        .eq("id", update.id),
    ),
  );

  const error = results.find((result) => result.error)?.error;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
