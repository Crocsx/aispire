import { z } from 'zod';

export const HistoryTimelineItemSchema = z.object({
  id: z.string().catch(''),
  output_condensed_summary: z.string().optional().default('').catch(''),
  output_condensed_suggestion: z.string().optional().default('').catch(''),
  user_name: z.string().optional().default('').catch(''),
  from_user_id: z.string().optional().default('').catch(''),
  avatar_url: z.string().optional().default('').catch(''),
  created_at: z.string().default('').catch(''),
  type: z
    .enum(['feedback', 'reflection'])
    .optional()
    .default('reflection')
    .catch('reflection'),
});
