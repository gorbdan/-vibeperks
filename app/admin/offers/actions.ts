"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OfferRepository } from "@/lib/offer-repository";
import type { CreateOfferInput } from "@/types/offer";

export async function createOfferAction(formData: FormData) {
  const repository = new OfferRepository();
  await repository.createOffer(parseOfferFormData(formData));
  revalidatePath("/admin/offers");
  redirect("/admin/offers");
}

export async function updateOfferAction(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Offer id is required");
  }

  const repository = new OfferRepository();
  await repository.updateOffer(id, parseOfferFormData(formData));
  revalidatePath("/admin/offers");
  redirect("/admin/offers");
}

export async function deleteOfferAction(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Offer id is required");
  }

  const repository = new OfferRepository();
  await repository.deleteOffer(id);
  revalidatePath("/admin/offers");
}

function parseOfferFormData(formData: FormData): CreateOfferInput {
  return {
    company: String(formData.get("company") || ""),
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    url: String(formData.get("url") || ""),
    type: String(formData.get("type") || ""),
    priority: Number(formData.get("priority") || 0),
    active: formData.get("active") === "on"
  };
}
