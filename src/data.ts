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
    id: "ms-munich-mile",
    name: "Microsoft München Mile",
    story:
      "Marienplatz up to Microsoft's Munich home in Schwabing — Walter-Gropius-Straße, where the local CxE team lives day to day.",
    target: 7500,
  },
  {
    id: "azure-west-europe",
    name: "Azure West Europe Loop",
    story:
      "A nod to the region powering half of EMEA — circle through the city as if you were tracing a packet across the West Europe datacenter.",
    target: 9000,
  },
  {
    id: "copilot-cadence",
    name: "Copilot Cadence",
    story:
      "Walking-meeting pace along the Isar. AirPods optional, ideas required — every stride is a prompt, every break is a refinement.",
    target: 8000,
  },
  {
    id: "cxe-customer-connect",
    name: "CxE Customer Connect",
    story:
      "The classic walking 1:1 — long enough for a real conversation, short enough to make the next session. The route is the meeting.",
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
