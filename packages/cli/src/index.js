#!/usr/bin/env node

const apiUrl = process.env.VIBEPERKS_API_URL || "http://localhost:3000";

try {
  const response = await fetch(`${apiUrl}/api/offer`);

  if (!response.ok) {
    process.exit(1);
  }

  const offer = await response.json();

  process.stdout.write(
    `🎁 ${offer.company}\n\n${offer.title}\n\nOpen: ${offer.url}\n`
  );
} catch {
  process.exit(1);
}
