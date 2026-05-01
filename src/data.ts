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
      "Match Munich's twin onion-domed towers, 98 m tall, watching over the Altstadt since 1488.",
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
    story: "Circle the 375-hectare urban park. Yes, larger than Central Park.",
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
      "Marienplatz up to Microsoft's Munich home in Schwabing on Walter-Gropius-Straße, where the local CxE team lives day to day and the offsite is hosted.",
    target: 7500,
  },
  {
    id: "azure-west-europe",
    name: "Azure West Europe Loop",
    story:
      "A nod to the region powering half of EMEA. Circle through the city as if you were tracing a packet across the West Europe datacenter.",
    target: 9000,
  },
  {
    id: "copilot-cadence",
    name: "Copilot Cadence",
    story:
      "Walking-meeting pace along the Isar. AirPods optional, ideas required. Every stride is a prompt, every break is a refinement.",
    target: 8000,
  },
  {
    id: "cxe-customer-connect",
    name: "CxE Customer Connect",
    story:
      "The classic walking 1:1: long enough for a real conversation, short enough to make the next session. The route is the meeting.",
    target: 11000,
  },
];

export type SeedTeam = {
  id: string;
  name: string;
};

/**
 * The 8 CxE EMEA Offsite 2026 teams. The canonical list of names + ids
 * used to map team picks in the UI to live aggregated rows in the
 * leaderboard. Step totals and walker counts are derived live from
 * registered walkers (see `leaderboardWith` in store.ts), not stored
 * statically here. Display name encodes the team lead so the directory
 * also doubles as a human point-of-contact list.
 */
export const TEAMS: SeedTeam[] = [
  { id: "care", name: "Care / Aleks" },
  { id: "uem", name: "UEM / Craig" },
  { id: "mtp", name: "MTP / Diego" },
  { id: "purview", name: "Purview / Nishan" },
  { id: "ccp", name: "CCP / Mags" },
  { id: "shared-services", name: "Shared Services / Kim" },
  { id: "idna", name: "IDNA / Travis" },
  { id: "cxe-lt", name: "CxE LT" },
];

/**
 * Legacy seed values from earlier development builds. The dashboard no
 * longer pre-populates with mock prior-day steps — every fresh install
 * starts at `0` across all 7 days. This array is kept solely so the
 * one-time migration in `loadInitial` can detect localStorage that still
 * holds the old demo pattern and zero it out before it pollutes Firestore.
 */
export const LEGACY_SEED_PRIOR_DAYS: readonly number[] = [
  7820, 9410, 6240, 8120, 5310, 11240,
];
