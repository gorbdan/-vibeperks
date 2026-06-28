import { OfferRepository } from "@/lib/offer-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const repository = new OfferRepository();
    const offer = await repository.getActiveOffer();

    if (!offer) {
      return Response.json({ error: "Offer not found" }, { status: 404 });
    }

    return Response.json(offer);
  } catch {
    return Response.json({ error: "Could not load offer" }, { status: 500 });
  }
}
