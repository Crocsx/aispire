import { z } from 'zod';

export const ReflectionInsightInputSchema = z.object({
  user_id: z.string(),
  feedback_summary: z.string().optional().default(''),
  strength_points: z.array(z.string()).optional().default([]),
  improvement_points: z.array(z.string()).optional().default([]),
  suggested_path: z.array(z.string()).optional().default([]),
  suggested_ressources: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
      })
    )
    .optional()
    .default([]),
});

export const ReflectionInsightSchema = z.object({
  id: z.string().catch(''),
  user_id: z.string().catch(''),
  feedback_summary: z.string().optional().default('').catch(''),
  strength_points: z.array(z.string()).optional().default([]).catch([]),
  improvement_points: z.array(z.string()).optional().default([]).catch([]),
  suggested_path: z.array(z.string()).optional().default([]).catch([]),
  suggested_ressources: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
      })
    )
    .optional()
    .default([])
    .catch([]),
  created_at: z.string().default('').catch(''),
});
