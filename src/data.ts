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
      "Skip the conf room. A walking 1:1 from Marienplatz to the Isar bridges and back — long enough for the real conversation, short enough to make the next session.",
    target: 11000,
  },
  {
    id: "msr-cambridge",
    name: "MSR Cambridge Mile",
    story:
      "In 1997 Microsoft Research opened its first lab outside Redmond, on the river Cam. Walk the Backs from Magdalene Bridge down past King's and Trinity, then back up — once for the founding paper, once for the citation.",
    target: 18000,
  },
  {
    id: "hannover-cebit",
    name: "Hannover Halle Marathon",
    story:
      "Cebit at the Hannover Messe — the EMEA tech pilgrimage from 1986 through 2018, where Bill Gates keynoted half the late '90s. Twenty-seven exhibition halls, miles of carpet. Walk it like you're chasing a demo schedule.",
    target: 20000,
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
