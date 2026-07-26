import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Client = {
  id: string;
  name: string;
  logo_url: string;
  website: string | null;
  position: number;
  created_at: string;
};

function normalizeClientUrl(imageUrl: string) {
  const marker = "/storage/v1/object/portfolio-images/";
  if (imageUrl.includes("/storage/v1/object/public/")) {
    return imageUrl;
  }
  if (imageUrl.includes(marker)) {
    return imageUrl.replace(marker, "/storage/v1/object/public/portfolio-images/");
  }
  return imageUrl;
}

function normalizeClients(clients: Client[]) {
  return clients.map((client) => ({
    ...client,
    logo_url: normalizeClientUrl(client.logo_url),
  }));
}

export async function fetchAllClients(): Promise<Client[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, logo_url, website, position, created_at")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return normalizeClients(data ?? []);
}