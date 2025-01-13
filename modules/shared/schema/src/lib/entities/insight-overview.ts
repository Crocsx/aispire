import { z } from 'zod';

export const InsightOverviewInputSchema = z.object({
  user_id: z.string().uuid(),
  profile_summary: z.string().nullable(),
  strengths: z.array(z.string()).nullable(),
  areas_for_improvement: z.array(z.string()).nullable(),
  key_characteristics: z.array(z.string()).nullable(),
  critical_focus_areas: z.array(z.string()).nullable(),
});

export const InsightOverviewSchema = z.object({
  id: z.string().uuid().catch(''),
  user_id: z.string().uuid().nullable().catch(null),
  profile_summary: z.string().nullable().catch(null),
  strengths: z.array(z.string()).nullable().catch(null),
  areas_for_improvement: z.array(z.string()).nullable().catch(null),
  key_characteristics: z.array(z.string()).nullable().catch(null),
  critical_focus_areas: z.array(z.string()).nullable().catch(null),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString())
    .catch(''),
});
