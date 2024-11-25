import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vercel.com/ythlium/aspire'),
  title: 'Aspire - Unlock Your Potential with AI-Powered Growth',
  description:
    'Aspire is an AI-driven platform designed to align personal growth with organizational values. Gain actionable insights, structured feedback, and personalized growth paths to thrive in your career and embrace AnyMind’s core values.',
  keywords:
    'Personal Growth, AI Feedback, Career Development, Structured Reflection, Growth Alignment, Feedback Utilization, Values-Driven Growth, Mentoring',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: 'Aspire',
    description:
      'Aspire is an AI-driven platform designed to align personal growth with organizational values. Gain actionable insights, structured feedback, and personalized growth paths to thrive in your career and embrace AnyMind’s core values.',
    url: 'https://www.vercel.com/ythlium/aspire',
    siteName: 'Aspire',
    images: [
      {
        url: '/meta/ogp.png',
        width: 1200,
        height: 860,
        alt: 'OGP Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
