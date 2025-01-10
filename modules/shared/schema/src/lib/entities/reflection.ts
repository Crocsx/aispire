import { z } from 'zod';

export const ReflectionInputSchema = z.object({
  user_id: z.string(),
  input_success: z.string().optional().default(''),
  input_challenge: z.string().optional().default(''),
  input_focus: z.string().optional().default(''),
  output_summary: z.string().optional().default(''),
  output_suggestion: z.string().optional().default(''),
  output_points_improved: z.array(z.string()).optional().default([]),
  output_points_to_improve: z.array(z.string()).optional().default([]),
  output_condensed_summary: z.string().optional().default(''),
  output_condensed_suggestion: z.string().optional().default(''),
});

export const ReflectionSchema = z.object({
  id: z.string().catch(''),
  user_id: z.string().catch(''),
  input_success: z.string().optional().default('').catch(''),
  input_challenge: z.string().optional().default('').catch(''),
  input_focus: z.string().optional().default('').catch(''),
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
