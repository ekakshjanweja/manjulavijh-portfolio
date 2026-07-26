import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { extractStoragePath } from "@/lib/supabase/storage";

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
    .from("clients")
    .delete()
    .eq("id", parsed.data.id);

  if (deleteError) {
    console.error("Client delete error:", deleteError.message);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  const { error: storageError } = await supabase.storage
    .from("portfolio-images")
    .remove([parsed.data.storagePath]);

  if (storageError) {
    console.error("Storage delete error:", storageError.message);
  }

  return NextResponse.json({ ok: true });
}