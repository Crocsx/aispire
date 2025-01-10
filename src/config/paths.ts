export const PATHS = {
  landing: () => '/',
  error: () => '/error',
  notFound: () => '/not-found',
  dashboard: () => '/dashboard',
  feedback: {
    reflection: () => '/feedback/reflection',
    peerFeedback: () => '/feedback/appraising',
    history: () => '/feedback/history',
    insights: () => '/feedback/insights',
    root: () => '/feedback',
  },
  growth: {
    practice: () => '/growth/practice',
    learning: () => '/growth/learning',
    career: () => '/growth/career',
    achievements: () => '/growth/achievements',
    root: () => '/growth',
  },
  insights: {
    overview: () => '/insights/overview',
    values: () => '/insights/values',
    improvement: () => '/insights/improvements',
    skillAnalysis: () => '/insights/skills',
    root: () => '/insights',
  },
  help: () => '/help',
  settings: {
    user: () => '/settings/user',
    general: () => '/settings/general',
    style: () => '/settings/style',
    root: () => '/settings',
  },
};
