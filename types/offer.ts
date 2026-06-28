export type Offer = {
  id: string;
  title: string;
  description: string;
  url: string;
  company: string;
  type: string;
  priority: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateOfferInput = Omit<Offer, "id" | "created_at" | "updated_at">;

export type UpdateOfferInput = Partial<CreateOfferInput>;
