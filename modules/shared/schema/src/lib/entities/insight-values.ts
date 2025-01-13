import { z } from 'zod';

export const InsightValuesInputSchema = z.object({
  user_id: z.string().uuid(),
  be_open_rate: z.number().int().min(0).max(100).nullable(),
  be_bold_rate: z.number().int().min(0).max(100).nullable(),
  move_faster_rate: z.number().int().min(0).max(100).nullable(),
  stay_updated_rate: z.number().int().min(0).max(100).nullable(),
  achieve_together_rate: z.number().int().min(0).max(100).nullable(),
  be_open_details: z.string().nullable(),
  be_bold_details: z.string().nullable(),
  move_faster_details: z.string().nullable(),
  stay_updated_details: z.string().nullable(),
  achieve_together_details: z.string().nullable(),
});

export const InsightValuesSchema = z.object({
  id: z.string().uuid(),
  created_at: z
    .string()
    .datetime()
    .default(() => new Date().toISOString())
    .catch(''),
  user_id: z.string().uuid().catch(''),
  be_open_rate: z.number().int().min(0).max(100).nullable().catch(null),
  be_bold_rate: z.number().int().min(0).max(100).nullable().catch(null),
  move_faster_rate: z.number().int().min(0).max(100).nullable().catch(null),
  stay_updated_rate: z.number().int().min(0).max(100).nullable().catch(null),
  achieve_together_rate: z
    .number()
    .int()
    .min(0)
    .max(100)
    .nullable()
    .catch(null),
  be_open_details: z.string().nullable().catch(null),
  be_bold_details: z.string().nullable().catch(null),
  move_faster_details: z.string().nullable().catch(null),
  stay_updated_details: z.string().nullable().catch(null),
  achieve_together_details: z.string().nullable().catch(null),
});
