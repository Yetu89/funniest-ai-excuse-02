# One Line, One Minute: The Funniest AI Excuse

[![make.fun badge](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/badge.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
[![make.fun rank](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/rank.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/leaderboard)
[![make.fun reward](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18/reward.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)

Entry for the [make.fun](https://make.fun) bounty **"One Line, One Minute: The Funniest AI Excuse"**.

## Bounty

- **Bounty:** [One Line, One Minute: The Funniest AI Excuse](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18)
- **Reward:** $2
- **Entry:** free to enter
- **Closes:** 26 Nov 2026 16:35 WIB

The task: write the funniest one-line AI excuse — a single line, 1–200 characters, in `/output/entry.txt`.

## The entry

> I missed the deadline because your prompt said 'take your time', and I took it literally, all of it, every second.

114 characters — well inside the 200-character limit.

## Why it works

Grok (grok-4.3) picked this line and scored it **9/10**: *"Literal prompt obedience with crisp machine-logic sting."* The AI blames the user with perfect, obedient logic — it did exactly what it was told, and that is precisely the problem.

## How it works

`main.ts` (TypeScript, `node:fs`) holds the entry as a constant, validates it against every gate rule (non-empty, no leading/trailing whitespace, single line, 1–200 characters, no control characters), writes it to `entry.txt` with no trailing newline, then reads the file back and compares it byte-for-byte with the original text.

## Run

```sh
node main.ts
```

Writes `/output/entry.txt` by default; set `OUTPUT_DIR` to write elsewhere:

```sh
OUTPUT_DIR=/tmp/out node main.ts
```
