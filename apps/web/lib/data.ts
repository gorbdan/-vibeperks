import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { getSupabase, hasSupabaseEnv, Offer, publicOffer } from "./supabase";

type EventRow = {
  id: string;
  offer_id: string;
  client_id: string | null;
  source: string | null;
  created_at: string;
};

type LocalDb = {
  offers: Offer[];
  impressions: EventRow[];
  clicks: EventRow[];
};

const localDbPath =
  process.env.VIBEPERKS_LOCAL_DB || join(process.cwd(), "data", "vibeperks.local.json");

const seedOffer: Offer = {
  id: "local-seed-offer",
  title: "Railway gives credits for new projects",
  description: "Example seed offer for local MVP testing.",
  url: "https://railway.app",
  emoji: "🎁",
  active: true,
  starts_at: null,
  ends_at: null,
  created_at: new Date("2026-01-01T00:00:00.000Z").toISOString()
};

export async function listOffers() {
  if (hasSupabaseEnv()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("offer_stats")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  const db = await readLocalDb();
  return db.offers
    .map((offer) => ({
      ...offer,
      impressions_count: db.impressions.filter((event) => event.offer_id === offer.id).length,
      clicks_count: db.clicks.filter((event) => event.offer_id === offer.id).length
    }))
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createOffer(input: {
  title: string;
  description?: string | null;
  url: string;
  emoji?: string | null;
}) {
  if (hasSupabaseEnv()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("offers")
      .insert({
        title: input.title,
        description: input.description || null,
        url: input.url,
        emoji: input.emoji || "🎁",
        active: true
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  const db = await readLocalDb();
  const offer: Offer = {
    id: randomUUID(),
    title: input.title,
    description: input.description || null,
    url: input.url,
    emoji: input.emoji || "🎁",
    active: true,
    starts_at: null,
    ends_at: null,
    created_at: new Date().toISOString()
  };

  db.offers.unshift(offer);
  await writeLocalDb(db);
  return offer;
}

export async function updateOfferActive(id: string, active: boolean) {
  if (hasSupabaseEnv()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("offers")
      .update({ active })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  const db = await readLocalDb();
  const offer = db.offers.find((item) => item.id === id);

  if (!offer) {
    throw new Error("Offer not found");
  }

  offer.active = active;
  await writeLocalDb(db);
  return offer;
}

export async function getActiveOffer(clientId: string | null) {
  if (hasSupabaseEnv()) {
    return getActiveSupabaseOffer(clientId);
  }

  const db = await readLocalDb();
  const now = Date.now();
  const recentCutoff = now - 6 * 60 * 60 * 1000;
  const recentOfferIds = new Set(
    db.impressions
      .filter((event) => clientId && event.client_id === clientId)
      .filter((event) => new Date(event.created_at).getTime() >= recentCutoff)
      .map((event) => event.offer_id)
  );

  const offer =
    db.offers.find((item) => isLive(item, now) && !recentOfferIds.has(item.id)) ||
    db.offers.find((item) => isLive(item, now));

  return offer ? publicOffer(offer) : null;
}

export async function recordImpression(input: {
  offer_id: string;
  client_id?: string | null;
  source?: string | null;
}) {
  return recordEvent("impressions", input);
}

export async function recordClick(input: {
  offer_id: string;
  client_id?: string | null;
  source?: string | null;
}) {
  return recordEvent("clicks", input);
}

async function getActiveSupabaseOffer(clientId: string | null) {
  const supabase = getSupabase();
  const now = new Date().toISOString();
  const recentCutoff = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();

  let query = supabase
    .from("offers")
    .select("*")
    .eq("active", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("created_at", { ascending: false });

  if (clientId) {
    const { data: recent } = await supabase
      .from("impressions")
      .select("offer_id")
      .eq("client_id", clientId)
      .gte("created_at", recentCutoff);

    const recentIds = (recent || []).map((row) => row.offer_id);
    if (recentIds.length > 0) {
      query = query.not("id", "in", `(${recentIds.join(",")})`);
    }
  }

  const { data, error } = await query.limit(1);

  if (error) throw new Error(error.message);
  return data?.[0] ? publicOffer(data[0]) : null;
}

async function recordEvent(
  table: "impressions" | "clicks",
  input: { offer_id: string; client_id?: string | null; source?: string | null }
) {
  if (hasSupabaseEnv()) {
    const supabase = getSupabase();
    const { error } = await supabase.from(table).insert({
      offer_id: input.offer_id,
      client_id: input.client_id || null,
      source: input.source || "cli"
    });

    if (error) throw new Error(error.message);
    return;
  }

  const db = await readLocalDb();
  db[table].push({
    id: randomUUID(),
    offer_id: input.offer_id,
    client_id: input.client_id || null,
    source: input.source || "cli",
    created_at: new Date().toISOString()
  });
  await writeLocalDb(db);
}

function isLive(offer: Offer, now: number) {
  const startsAt = offer.starts_at ? new Date(offer.starts_at).getTime() : null;
  const endsAt = offer.ends_at ? new Date(offer.ends_at).getTime() : null;

  return offer.active && (!startsAt || startsAt <= now) && (!endsAt || endsAt >= now);
}

async function readLocalDb(): Promise<LocalDb> {
  try {
    const value = await readFile(localDbPath, "utf8");
    return JSON.parse(value);
  } catch {
    const db = { offers: [seedOffer], impressions: [], clicks: [] };
    await writeLocalDb(db);
    return db;
  }
}

async function writeLocalDb(db: LocalDb) {
  await mkdir(dirname(localDbPath), { recursive: true });
  await writeFile(localDbPath, JSON.stringify(db, null, 2));
}
