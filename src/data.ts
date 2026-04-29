export type ChallengeDef = {
  id: string;
  name: string;
  story: string;
  target: number;
};

export const CHALLENGES: ChallengeDef[] = [
  {
    id: "frauenkirche",
    name: "Frauenkirche Tower Climb",
    story:
      "Match Munich's twin onion-domed towers — 98 m tall, watching over the Altstadt since 1488.",
    target: 10000,
  },
  {
    id: "viktualienmarkt",
    name: "Viktualienmarkt Power Walk",
    story:
      "Five laps of the city's open-air food market, daily since 1807. Smells like fresh Brezn.",
    target: 8000,
  },
  {
    id: "englischer-garten",
    name: "Englischer Garten Grand Loop",
    story: "Circle the 375-hectare urban park — yes, larger than Central Park.",
    target: 14000,
  },
  {
    id: "isar",
    name: "Isar River Shoreline",
    story:
      "Riverbank stroll from Deutsches Museum north to the Englischer Garten footbridge.",
    target: 15000,
  },
  {
    id: "marienplatz",
    name: "Marienplatz Loop",
    story:
      "A morning circuit of the central square, past the Glockenspiel and the New Town Hall.",
    target: 6000,
  },
  {
    id: "olympiapark",
    name: "Olympiapark Hill Run",
    story:
      "Up the Olympiaberg for the city panorama, then a long lap around the lake.",
    target: 12000,
  },
  {
    id: "deutsches-museum",
    name: "Deutsches Museum Mile",
    story:
      "Walk from your hotel to the world's largest science museum — and back.",
    target: 7000,
  },
  {
    id: "bmw-welt",
    name: "BMW Welt to Olympiapark",
    story:
      "From shimmering BMW Welt to the 1972 Olympic complex — engineering and architecture.",
    target: 9000,
  },
  {
    id: "hofbrauhaus",
    name: "Hofbräuhaus Stein Stroll",
    story:
      "From Marienplatz down to the world's most famous beer hall, founded by Duke Wilhelm V in 1589.",
    target: 7500,
  },
  {
    id: "nymphenburg",
    name: "Nymphenburg Palace Gardens",
    story:
      "Wander the baroque grounds where Bavarian royals once strolled — 200 hectares of canals, lakes, and pavilions.",
    target: 11000,
  },
];

export type SeedTeam = {
  id: string;
  name: string;
  members: number;
  /** Base offsite-week step total before adding the user's contribution. */
  baseSteps: number;
};

/**
 * The 9 CxE teams. The user's team (defaults to "Threat Protection") will
 * have the user's logged steps added on top of the base.
 */
export const TEAMS: SeedTeam[] = [
  { id: "threat-protection", name: "Threat Protection", members: 14, baseSteps: 181000 },
  { id: "purview-ces", name: "Purview / CES", members: 12, baseSteps: 162890 },
  { id: "idna", name: "IDNA", members: 10, baseSteps: 154300 },
  { id: "care", name: "CARE", members: 11, baseSteps: 148210 },
  { id: "scale-enablement", name: "Scale Enablement", members: 9, baseSteps: 132500 },
  { id: "ccp", name: "CCP", members: 8, baseSteps: 121980 },
  { id: "cxe-lt", name: "CxE LT", members: 6, baseSteps: 108450 },
  { id: "shared-services", name: "Shared Services", members: 13, baseSteps: 96720 },
  { id: "management", name: "Management", members: 5, baseSteps: 78340 },
];

/**
 * Seed step entries for the previous six days so a fresh user lands on a
 * dashboard that already feels lived-in. Today is computed at runtime and
 * starts at 0 — the user logs their own.
 */
export const SEED_PRIOR_DAYS: number[] = [7820, 9410, 6240, 8120, 5310, 11240];
