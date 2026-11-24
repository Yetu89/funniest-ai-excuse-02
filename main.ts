/**
 * Funniest AI Excuse — make.fun bounty entry
 * ==========================================
 * Bounty: "One Line, One Minute: The Funniest AI Excuse"
 * URL: https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18
 * Reward: $2, free to enter. Closes 26 Nov 2026 16:35 WIB.
 *
 * Entry (exactly one line, 114 characters):
 *   I missed the deadline because your prompt said 'take your time',
 *   and I took it literally, all of it, every second.
 *
 * The joke, in one breath: the AI missed the deadline — and its excuse
 * is that it obeyed the user perfectly. "Take your time" was a casual,
 * human idiom; the machine parsed it as an instruction and executed it
 * to the letter, consuming every second available. The humour comes
 * from the collision between human idiom and machine literalism: the
 * model is not apologising for disobeying, it is apologising for
 * obeying too well, and the blame quietly slides back onto the prompt
 * itself. "All of it, every second" escalates the literalism in three
 * beats — take it, all of it, every second — so the punchline lands as
 * a confession that is also an accusation.
 *
 * Why it was chosen (Grok grok-4.3, score 9/10): "Literal prompt
 * obedience with crisp machine-logic sting." Grok picked this line
 * over the alternatives because the sting is in the logic itself: no
 * setup is needed, the premise and the punchline are the same
 * sentence, and it reads like something an AI would genuinely say.
 * It is self-deprecating about AI behaviour while turning the tables
 * on the human who wrote the prompt — the classic shape of the
 * funniest AI excuse.
 *
 * Gate (make.fun harness): /output/entry.txt, UTF-8, 1..200 characters,
 * exactly one line. The output file must contain the entry text and
 * nothing else — no trailing newline, no extra whitespace, no extra
 * lines. The entry is 114 characters, comfortably inside the limit,
 * leaving 86 characters of headroom.
 *
 * Two layers of defence:
 *   1. validate() — rejects the text before anything is written if it
 *      breaks any gate rule (empty, whitespace-only, leading/trailing
 *      whitespace, any \n or \r, length outside 1..200, or any control
 *      character U+0000-U+001F / U+007F). Validation happens first, so
 *      a bad entry can never reach the output file.
 *   2. Round-trip check — after writing entry.txt, main() reads the
 *      file back and compares it byte-for-byte with TEXT, throwing if
 *      even a single byte differs. This catches encoding surprises,
 *      accidental newlines, and filesystem quirks that validation
 *      alone cannot see.
 *
 * Design notes:
 *   - TEXT is a single constant; there is exactly one source of truth
 *     for the entry, so the validated, written, and verified strings
 *     can never drift apart.
 *   - The output directory comes from the OUTPUT_DIR environment
 *     variable and defaults to "/output", matching the harness gate.
 *   - The file is written with explicit "utf8" encoding and no
 *     trailing newline, so the byte count on disk equals the
 *     character count of TEXT (114 bytes, all ASCII).
 *
 * Run:  node main.ts        (writes /output/entry.txt)
 *       OUTPUT_DIR=/tmp/out node main.ts   (writes to a custom directory)
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "I missed the deadline because your prompt said 'take your time', and I took it literally, all of it, every second.";

/**
 * Validate an entry against the make.fun gate rules.
 * Throws on the first violated rule; returns nothing on success.
 */
function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line (no \\n or \\r)");
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `entry must be 1..200 characters, got ${text.length}`,
    );
  }
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if ((code >= 0x00 && code <= 0x1f) || code === 0x7f) {
      throw new Error(
        `entry must not contain control characters (U+${code
          .toString(16)
          .padStart(4, "0")} at index ${i})`,
      );
    }
  }
}

function main(): void {
  validate(TEXT);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const outPath = `${outDir}/entry.txt`;
  // Write exactly TEXT — no trailing newline, UTF-8.
  writeFileSync(outPath, TEXT, "utf8");

  // Round-trip check: read it back and compare byte-for-byte.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip mismatch: entry.txt does not match TEXT");
  }

  console.log(`Wrote ${outPath} (${TEXT.length} characters)`);
}

main();
