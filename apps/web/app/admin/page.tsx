"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Offer } from "../../lib/supabase";

type AdminOffer = Offer & {
  impressions_count: number;
  clicks_count: number;
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [offers, setOffers] = useState<AdminOffer[]>([]);
  const [error, setError] = useState("");

  async function loadOffers(nextToken = token) {
    setError("");
    const response = await fetch("/api/admin/offers", {
      headers: { Authorization: `Bearer ${nextToken}` }
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Could not load offers");
      return;
    }

    setOffers(data.offers);
  }

  async function createOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/offers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: form.get("title"),
        description: form.get("description"),
        url: form.get("url"),
        emoji: form.get("emoji") || "🎁"
      })
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Could not create offer");
      return;
    }

    event.currentTarget.reset();
    await loadOffers();
  }

  async function setActive(id: string, active: boolean) {
    const response = await fetch(`/api/admin/offers?id=${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ active })
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Could not update offer");
      return;
    }

    await loadOffers();
  }

  useEffect(() => {
    const savedToken = window.localStorage.getItem("vibeperks_admin_token");
    if (savedToken) {
      setToken(savedToken);
      loadOffers(savedToken);
    }
  }, []);

  return (
    <main className="page admin-layout">
      <header className="topbar">
        <div>
          <strong>VibePerks Admin</strong>
          <p>Manage offers, impressions, and clicks.</p>
        </div>
        <a href="/">Home</a>
      </header>

      <section className="card">
        <label className="field">
          Admin token
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            onBlur={() => window.localStorage.setItem("vibeperks_admin_token", token)}
            placeholder="ADMIN_TOKEN"
          />
        </label>
        <button className="secondary" onClick={() => loadOffers()}>
          Load offers
        </button>
        {error ? <p>{error}</p> : null}
      </section>

      <section className="card">
        <h2>Add offer</h2>
        <form className="form" onSubmit={createOffer}>
          <label className="field">
            Title
            <input name="title" required placeholder="Railway gives $20 credits" />
          </label>
          <label className="field">
            Description
            <textarea name="description" rows={3} placeholder="Short context for the admin" />
          </label>
          <label className="field">
            URL
            <input name="url" required type="url" placeholder="https://example.com" />
          </label>
          <label className="field">
            Emoji
            <input name="emoji" maxLength={8} placeholder="🎁" />
          </label>
          <button className="cta" type="submit">
            Add offer
          </button>
        </form>
      </section>

      <section>
        <h2>Offers</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Offer</th>
              <th>Status</th>
              <th>Stats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>
                  <strong>
                    {offer.emoji} {offer.title}
                  </strong>
                  <br />
                  <a href={offer.url}>{offer.url}</a>
                </td>
                <td>{offer.active ? "active" : "off"}</td>
                <td>
                  {offer.impressions_count} impressions
                  <br />
                  {offer.clicks_count} clicks
                </td>
                <td>
                  <div className="row-actions">
                    <button className="secondary" onClick={() => setActive(offer.id, true)}>
                      Enable
                    </button>
                    <button className="secondary" onClick={() => setActive(offer.id, false)}>
                      Disable
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
