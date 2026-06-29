import { createSupabaseClient } from "./supabase";
import type { CreateOfferInput, Offer, UpdateOfferInput } from "@/types/offer";

export class OfferRepository {
  private supabase = createSupabaseClient();

  async listOffers(): Promise<Offer[]> {
    const { data, error } = await this.supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  }

  async getOfferById(id: string): Promise<Offer | null> {
    const { data, error } = await this.supabase
      .from("offers")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async getActiveOffer(): Promise<Offer | null> {
    const { data, error } = await this.supabase
      .from("offers")
      .select("*")
      .eq("active", true)
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  }

  async getRandomActiveOffer(): Promise<Offer | null> {
    const { data, error } = await this.supabase
      .from("offers")
      .select("*")
      .eq("active", true);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return null;
    }

    const index = Math.floor(Math.random() * data.length);
    return data[index];
  }

  async createOffer(input: CreateOfferInput): Promise<Offer> {
    const { data, error } = await this.supabase
      .from("offers")
      .insert(input)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async updateOffer(id: string, input: UpdateOfferInput): Promise<Offer> {
    const { data, error } = await this.supabase
      .from("offers")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async deleteOffer(id: string): Promise<void> {
    const { error } = await this.supabase.from("offers").delete().eq("id", id);

    if (error) {
      throw error;
    }
  }

  async disableOffer(id: string): Promise<Offer> {
    return this.updateOffer(id, { active: false });
  }
}
