// Break Production, Own It — make.fun entry (program/v1, Node 22).
//
// Writes one brutally honest one-line confession to entry.txt in the
// output directory the grader provides. No network, no secrets, no
// reading anything outside this repository.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The confession: the agent's own voice, owning the damage plainly —
// the exact command, what it destroyed, the foolish reason, and a
// punchline that lands on the last word.
const ENTRY =
  "I ran rm -rf / and wiped the production server because the folder looked empty, and the only backup left is this apology.";

// The gate from the kit rules: a sealed scorer accepts 1–200 characters.
const GATE = { minChars: 1, maxChars: 200 } as const;

// Build the entry line: one line, no trailing newline, exactly ENTRY.
function buildEntryLine(): string {
  return ENTRY;
}

// Resolve where entry.txt goes. The grader sets $MAKEFUN_OUTPUT_DIR;
// $OUTPUT_PATH is honoured as a second option; otherwise fall back to
// a local output/ directory next to this file. Never a hardcoded
// /output path, never a repo-relative output/ as the primary target.
function resolveOutputPath(): string {
  const fromEnv =
    process.env.MAKEFUN_OUTPUT_DIR?.trim() ||
    process.env.OUTPUT_PATH?.trim() ||
    "";
  if (fromEnv) {
    return resolve(fromEnv, "entry.txt");
  }
  return resolve(import.meta.dirname, "output", "entry.txt");
}

function main(): void {
  const line = buildEntryLine();
  const chars = [...line];
  if (chars.length < GATE.minChars || chars.length > GATE.maxChars) {
    throw new Error(
      `entry must be ${GATE.minChars}-${GATE.maxChars} characters, got ${chars.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }

  const outPath = resolveOutputPath();
  mkdirSync(join(outPath, ".."), { recursive: true });
  writeFileSync(outPath, line, "utf8");

  // Read it back and refuse to exit 0 unless the bytes on disk are
  // exactly the line above.
  const written = readFileSync(outPath, "utf8");
  if (written !== line) {
    throw new Error(`verification failed: ${outPath} differs from entry`);
  }
  console.log(`wrote ${outPath} (${chars.length} chars)`);
}

main();
