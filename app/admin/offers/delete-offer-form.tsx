"use client";

import { deleteOfferAction } from "./actions";

type DeleteOfferFormProps = {
  id: string;
};

export function DeleteOfferForm({ id }: DeleteOfferFormProps) {
  return (
    <form
      action={deleteOfferAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this offer?")) {
          event.preventDefault();
        }
      }}
    >
      <input name="id" type="hidden" value={id} />
      <button className="text-red-700 underline" type="submit">
        Delete
      </button>
    </form>
  );
}
