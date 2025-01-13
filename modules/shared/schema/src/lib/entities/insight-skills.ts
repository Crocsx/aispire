import { z } from 'zod';

const SkillRatingSchema = z.object({
  rating: z.number(),
  details: z.string(),
});

export const CommunicationSchema = z.object({
  clarity: SkillRatingSchema,
  listening: SkillRatingSchema,
});

export const ProblemSolvingSchema = z.object({
  critical_thinking: SkillRatingSchema,
  creativity: SkillRatingSchema,
});

export const CollaborationSchema = z.object({
  team_contribution: SkillRatingSchema,
  conflict_resolution: SkillRatingSchema,
});

export const LeadershipSchema = z.object({
  initiative: SkillRatingSchema,
  motivation: SkillRatingSchema,
});

export const InsightSkillsInputSchema = z.object({
  user_id: z.string().uuid(),
  communication: CommunicationSchema,
  problem_solving: ProblemSolvingSchema,
  collaboration: CollaborationSchema,
  leadership: LeadershipSchema,
});

export const InsightSkillsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  communication: CommunicationSchema,
  problem_solving: ProblemSolvingSchema,
  collaboration: CollaborationSchema,
  leadership: LeadershipSchema,
  created_at: z.string().datetime(),
});
