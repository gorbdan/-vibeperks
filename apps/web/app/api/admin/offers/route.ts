import { createOffer, listOffers, updateOfferActive } from "../../../../lib/data";
import { requireAdmin } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    return Response.json({ offers: await listOffers() });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);

  if (!body?.title || !body?.url) {
    return Response.json({ error: "title and url are required" }, { status: 400 });
  }

  try {
    const offer = await createOffer({
      title: body.title,
      description: body.description || null,
      url: body.url,
      emoji: body.emoji || "🎁"
    });
    return Response.json({ offer }, { status: 201 });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const body = await request.json().catch(() => null);

  if (!id) {
    return Response.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const offer = await updateOfferActive(id, Boolean(body?.active));
    return Response.json({ offer });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
