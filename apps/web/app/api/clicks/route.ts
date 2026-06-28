import { recordClick } from "../../../lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const offerId = body?.offer_id;

  if (!offerId) {
    return Response.json({ error: "offer_id is required" }, { status: 400 });
  }

  try {
    await recordClick({
      offer_id: offerId,
      client_id: body.client_id || null,
      source: body.source || "cli"
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }

  return Response.json({ ok: true });
}
