import Link from "next/link";
import { OfferRepository } from "@/lib/offer-repository";
import type { Offer } from "@/types/offer";
import { createOfferAction, updateOfferAction } from "./actions";
import { DeleteOfferForm } from "./delete-offer-form";

export const dynamic = "force-dynamic";

type OffersPageProps = {
  searchParams: {
    new?: string;
    edit?: string;
  };
};

export default async function OffersPage({ searchParams }: OffersPageProps) {
  const repository = new OfferRepository();
  const offers = await repository.listOffers();
  const editingOffer = searchParams.edit
    ? await repository.getOfferById(searchParams.edit)
    : null;
  const showForm = searchParams.new === "1" || Boolean(editingOffer);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Offers</h1>
          <p className="mt-2 text-sm text-gray-600">Manage VibePerks offers.</p>
        </div>
        <Link
          className="rounded bg-black px-4 py-2 text-sm text-white"
          href="/admin/offers?new=1"
        >
          New Offer
        </Link>
      </div>

      {showForm ? <OfferForm offer={editingOffer} /> : null}

      <div className="overflow-x-auto border">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-3">Company</th>
              <th className="border-b px-4 py-3">Title</th>
              <th className="border-b px-4 py-3">Type</th>
              <th className="border-b px-4 py-3">Active</th>
              <th className="border-b px-4 py-3">Priority</th>
              <th className="border-b px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td className="border-b px-4 py-3">{offer.company}</td>
                <td className="border-b px-4 py-3">{offer.title}</td>
                <td className="border-b px-4 py-3">{offer.type}</td>
                <td className="border-b px-4 py-3">
                  {offer.active ? "Yes" : "No"}
                </td>
                <td className="border-b px-4 py-3">{offer.priority}</td>
                <td className="border-b px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      className="underline"
                      href={`/admin/offers?edit=${offer.id}`}
                    >
                      Edit
                    </Link>
                    <DeleteOfferForm id={offer.id} />
                  </div>
                </td>
              </tr>
            ))}
            {offers.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-gray-600" colSpan={6}>
                  No offers yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function OfferForm({ offer }: { offer: Offer | null }) {
  const action = offer ? updateOfferAction : createOfferAction;

  return (
    <form action={action} className="mb-8 grid gap-4 border p-4">
      <h2 className="text-xl font-semibold">
        {offer ? "Edit Offer" : "New Offer"}
      </h2>
      {offer ? <input name="id" type="hidden" value={offer.id} /> : null}

      <label className="grid gap-1">
        <span>Company</span>
        <input
          className="border px-3 py-2"
          defaultValue={offer?.company}
          name="company"
          required
        />
      </label>

      <label className="grid gap-1">
        <span>Title</span>
        <input
          className="border px-3 py-2"
          defaultValue={offer?.title}
          name="title"
          required
        />
      </label>

      <label className="grid gap-1">
        <span>Description</span>
        <textarea
          className="border px-3 py-2"
          defaultValue={offer?.description}
          name="description"
          required
          rows={4}
        />
      </label>

      <label className="grid gap-1">
        <span>URL</span>
        <input
          className="border px-3 py-2"
          defaultValue={offer?.url}
          name="url"
          required
          type="url"
        />
      </label>

      <label className="grid gap-1">
        <span>Type</span>
        <input
          className="border px-3 py-2"
          defaultValue={offer?.type}
          name="type"
          required
        />
      </label>

      <label className="grid gap-1">
        <span>Priority</span>
        <input
          className="border px-3 py-2"
          defaultValue={offer?.priority ?? 0}
          name="priority"
          required
          type="number"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          defaultChecked={offer?.active ?? true}
          name="active"
          type="checkbox"
        />
        <span>Active</span>
      </label>

      <div className="flex gap-3">
        <button
          className="rounded bg-black px-4 py-2 text-sm text-white"
          type="submit"
        >
          Save
        </button>
        <Link className="px-4 py-2 text-sm underline" href="/admin/offers">
          Cancel
        </Link>
      </div>
    </form>
  );
}
