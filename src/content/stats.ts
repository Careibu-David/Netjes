// DEMO VALUES — TEMPORARY. Replace with real pilot figures once the pilot starts.
export const pilotStats = {
  streets: 3,
  residents: 48,
  areas: 2,
} as const;

export type PilotStatKey = keyof typeof pilotStats;
