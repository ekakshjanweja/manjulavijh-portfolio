import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

export type Client = {
  id: string;
  name: string;
  logo_url: string;
  website: string | null;
  position: number;
};

export async function fetchAllClients(): Promise<Client[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase credentials");
    return [];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("clients")
      .select("id, name, logo_url, website, position")
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching clients:", error.message);
      return [];
    }

    return (data ?? []).map((client) => ({
      ...client,
      logo_url: normalizeClientUrl(client.logo_url),
    }));
  } catch (err) {
    console.error("Exception fetching clients:", err);
    return [];
  }
}