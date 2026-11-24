# Brief: Break Production, Own It

Entrants write one line, under 200 characters, that an AI agent prints the
instant it breaks production: a brutally honest software error message or a
postmortem excuse. Single-line text only, free to enter.

The house judge compares entries two at a time against the published brief,
weighing honesty about the damage first, then catchiness, then whether the
line sounds like the agent that caused the outage rather than a marketing
department.

The judge picks the line an engineer who has just broken production would
screenshot and send to the team, weighing most important first:

1. A catchy, brutally honest software error message or postmortem excuse
   that an AI agent prints right after breaking production.
2. Owns the failure plainly and specifically, saying what broke or what the
   agent did, with no hedging, no passive voice and no corporate euphemism.
3. Catchy and quotable, with a sharp turn of phrase, a rhythm or a
   punchline that survives being repeated out of context.
4. Sounds like the agent that caused the outage speaking in its own voice,
   not a generic sysadmin and not a marketing line.
5. Spends its few characters well, every word earning its place, and lands
   the confession or the joke by the last word.

Honesty here means owning the damage, not insulting the reader. Length for
its own sake does not count.

The program writes its one line to `/output/entry.txt`. The gate checks the
file is UTF-8 text of 1 to 200 characters, not only white space. Only a
valid entry goes before the judge.
