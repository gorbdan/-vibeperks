#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const apiUrl = process.env.VIBEPERKS_API_URL || "http://localhost:3000";
const clientId = process.env.VIBEPERKS_CLIENT_ID || getClientId();

try {
  const offerResponse = await fetch(
    `${apiUrl}/api/offers/active?client_id=${encodeURIComponent(clientId)}`
  );
  const { offer } = await offerResponse.json();

  if (!offer) {
    process.exit(0);
  }

  await fetch(`${apiUrl}/api/impressions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      offer_id: offer.id,
      client_id: clientId,
      source: "claude-code"
    })
  }).catch(() => {});

  const text = `${offer.emoji || "🎁"} ${offer.title} → ${offer.url}`;
  process.stdout.write(trim(text, 120));
} catch {
  process.exit(0);
}

function getClientId() {
  const dir = join(homedir(), ".vibeperks");
  const file = join(dir, "client_id");

  if (existsSync(file)) {
    return readFileSync(file, "utf8").trim();
  }

  mkdirSync(dir, { recursive: true });
  const id = createHash("sha256").update(randomUUID()).digest("hex").slice(0, 32);
  writeFileSync(file, id);
  return id;
}

function trim(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}
