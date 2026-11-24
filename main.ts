// Break Production, Own It — make.fun one-line entry.
//
// The entry is a single brutally honest line: the words an AI agent prints
// the moment it breaks production. The judge weighs honesty about the
// damage first, then catchiness, then whether it sounds like the agent
// that caused the outage speaking in its own voice.
//
// This line owns a specific failure end to end: the exact command, the
// exact damage (40,000 accounts gone), and a rollback plan that was never
// a plan at all. It lands on the last word.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. One line, 118 characters. The file holds exactly these
// bytes — no trailing newline — so the gate's character count (1 to 200)
// and its single-line check both read the line itself, with nothing extra.
const LINE =
  "I ran DROP TABLE users; in production, watched 40,000 accounts vanish, and my rollback plan was hoping nobody noticed.";

const MAX_CHARS = 200;
const OUTPUT_FILE = "entry.txt";

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main() {
  // The grader runs `node /bot/main.ts` with the repo mounted read-only
  // at /bot and an empty writable directory at /output, with
  // MAKEFUN_OUTPUT_DIR=/output in the environment. When that variable is
  // set we must write ONLY there — never create or write a repo-relative
  // output/ path, which would fail on the read-only filesystem.
  // With no variable set (local runs) we fall back to ./output.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");

  // Validate the line before writing anything.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    fail(`entry is ${LINE.length} characters, outside the 1-${MAX_CHARS} range`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    fail("entry must be a single line");
  }
  if (LINE.trim().length === 0) {
    fail("entry must not be only whitespace");
  }

  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, OUTPUT_FILE);
  writeFileSync(outPath, LINE, "utf8");

  // Read it back and confirm the file is byte-identical to what we wrote.
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== LINE) {
    fail("read-back mismatch: output file differs from the entry line");
  }

  console.log(`wrote ${outPath} (${LINE.length} chars)`);
}

main();
