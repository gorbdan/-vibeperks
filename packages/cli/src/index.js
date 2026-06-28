#!/usr/bin/env node

const apiUrl = process.env.VIBEPERKS_API_URL || "http://localhost:3000";

try {
  const response = await fetch(`${apiUrl}/api/offer`);

  if (!response.ok) {
    process.exit(0);
  }

  const offer = await response.json();
  const label = offer.title === offer.company ? offer.description : offer.title;
  const line = `🎁 ${offer.company} → ${label || offer.title}`;

  process.stdout.write(trim(line, 80));
} catch {
  process.exit(0);
}

function trim(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}
