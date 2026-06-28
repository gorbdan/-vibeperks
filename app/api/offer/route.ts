import { OfferRepository } from "@/lib/offer-repository";
import { errorResponse, jsonResponse } from "@/lib/api-response";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const repository = new OfferRepository();
    const offer = await repository.getActiveOffer();

    if (!offer) {
      return errorResponse("Offer not found", 404);
    }

    return jsonResponse(offer);
  } catch (error) {
    logger.error("Could not load offer", error, { route: "GET /api/offer" });
    return errorResponse("Could not load offer", 500);
  }
}
