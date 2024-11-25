export const PATHS = {
  home: () => '/',
  error: () => '/error',
  notFound: () => '/not-found',
  auth: {
    signIn: () => '/sign-in',
    signUp: () => '/sign-up',
    forgotPassword: () => '/forgot-password',
    resetPassword: () => '/reset-password',
    validateEmail: () => '/validate-email',
    terms: () => '/terms',
  },
  dashboard: () => '/dashboard',
  reflection: () => '/reflection',
  roadmap: () => '/roadmap',
  feedback: () => '/feedback',
  values: () => '/values',
  help: () => '/help',
  settings: {
    user: () => '/settings/user',
    styling: () => '/settings/styling',
  },
};
