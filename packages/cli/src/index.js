#!/usr/bin/env node

import { cliConfig } from "./config.js";

if (process.argv.includes("--version")) {
  process.stdout.write("0.1.0-alpha\n");
  process.exit(0);
}

try {
  const response = await fetch(`${cliConfig.apiUrl}/api/offer`);

  if (!response.ok) {
    process.exit(0);
  }

  const offer = await response.json();
  const label = offer.title === offer.company ? offer.description : offer.title;
  const line = `🎁 ${offer.company} → ${label || offer.title}`;

  process.stdout.write(trim(line, cliConfig.maxLineLength));
} catch {
  process.exit(0);
}

function trim(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}
