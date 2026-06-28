import { getActiveOffer } from "../../../../lib/data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get("client_id");

  try {
    return Response.json({ offer: await getActiveOffer(clientId) });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
