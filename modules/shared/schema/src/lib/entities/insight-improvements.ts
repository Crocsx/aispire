import { z } from 'zod';

export const InsightImprovementsInputSchema = z.object({
  user_id: z.string().uuid(),
  run_id: z.string().uuid(),
  improvements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      actions: z.array(z.string()),
    })
  ),
});

export const InsightImprovementsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  run_id: z.string().uuid(),
  improvements: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      actions: z.array(z.string()),
    })
  ),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
});
