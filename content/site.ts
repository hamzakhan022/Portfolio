/**
 * Site-wide facts: name, contact details and links.
 * Edit text here — components read from this file.
 */
export const site = {
  name: 'Muhammad Ameer Hamza',
  shortName: 'M. Ameer Hamza',
  title: 'Full-Stack Engineer',
  location: 'Islamabad',
  workSetup: 'working remotely with a UK firm',
  email: 'ameerhamza200345@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ameer-hamza-swe/',
  linkedinHandle: 'ameer-hamza-swe',
  github: 'https://github.com/hamzakhan022',
  cv: '/cv.pdf',
  cvDownloadName: 'Muhammad-Ameer-Hamza-CV.pdf',
  /** Set to your Calendly link to show a "Book a call" row in Contact. */
  calendly: null as string | null,
  // calendly: 'https://calendly.com/your-handle/30min',
  availability: 'Open to remote roles & select freelance projects',
  description:
    'Full-Stack Engineer in Islamabad, working remotely with a UK firm. I build business platforms end to end (reporting, accounting, POS and distribution systems) plus the automation that runs them.',
} as const;

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain. */
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return 'http://localhost:3000';
}
