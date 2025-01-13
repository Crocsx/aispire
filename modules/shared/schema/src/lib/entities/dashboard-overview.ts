import { z } from 'zod';

export const MetricSchema = z.object({
  current_value: z.number(),
  goal_value: z.number(),
  period: z.string(),
});

export const DashboardOverviewSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.string().datetime(),
  goals_completion: MetricSchema,
  feedback_received: MetricSchema,
  learning_hours: MetricSchema,
  team_impact: MetricSchema,
  last_reflection_date: z.string().datetime().nullable(),
  recent_feedbacks: z.array(
    z.object({
      id: z.string().uuid(),
      from_user_id: z.string().uuid(),
      from_user_name: z.string(),
      from_user_avatar: z.string().nullable(),
      content: z.string(),
      created_at: z.string().datetime(),
      feedback_type: z.enum(['positive', 'constructive', 'neutral']),
    })
  ),
  quick_insights: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string(),
      description: z.string(),
      type: z.enum(['achievement', 'focus_area', 'milestone']),
      created_at: z.string().datetime(),
    })
  ),
  upcoming_sessions: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string(),
      date: z.string().datetime(),
      type: z.enum(['reflection', 'feedback', 'learning']),
    })
  ),
});
