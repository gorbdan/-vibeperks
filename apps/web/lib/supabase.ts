import { createClient } from "@supabase/supabase-js";

export type Offer = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  emoji: string;
  active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  impressions_count?: number;
  clicks_count?: number;
};

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false
    }
  });
}

export function hasSupabaseEnv() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function publicOffer(offer: Offer) {
  return {
    id: offer.id,
    title: offer.title,
    description: offer.description,
    url: offer.url,
    emoji: offer.emoji
  };
}

export function requireAdmin(request: Request) {
  const expected = process.env.ADMIN_TOKEN || "dev";
  const header = request.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "");

  if (!expected || token !== expected) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
