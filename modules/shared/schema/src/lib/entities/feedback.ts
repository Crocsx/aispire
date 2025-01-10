import { z } from 'zod';

export const FeedbackType = z.enum([
  'MANAGER_REVIEW',
  'PEER_REVIEW',
  'CLIENT_FEEDBACK',
]);

export const FeedbackInputSchema = z.object({
  from_user_id: z.string().catch(''),
  to_user_id: z.string().catch(''),
  content: z.string().catch(''),
  type: z.string(),
  output_summary: z.string().optional().default(''),
  output_suggestion: z.string().optional().default(''),
  output_points_improved: z.array(z.string()).optional().default([]),
  output_points_to_improve: z.array(z.string()).optional().default([]),
  output_condensed_summary: z.string().optional().default(''),
  output_condensed_suggestion: z.string().optional().default(''),
});

export const FeedbackSchema = z.object({
  id: z.string().catch(''),
  from_user_id: z.string().catch(''),
  to_user_id: z.string().catch(''),
  content: z.string().catch(''),
  type: FeedbackType.catch(FeedbackType.Values.MANAGER_REVIEW),
  output_summary: z.string().optional().default('').catch(''),
  output_suggestion: z.string().optional().default('').catch(''),
  output_points_improved: z.array(z.string()).optional().default([]).catch([]),
  output_points_to_improve: z
    .array(z.string())
    .optional()
    .default([])
    .catch([]),
  output_condensed_summary: z.string().optional().default('').catch(''),
  output_condensed_suggestion: z.string().optional().default('').catch(''),
  created_at: z.string().default('').catch(''),
});
