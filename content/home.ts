/**
 * Home-page copy that isn't project-specific.
 */

export const hero = {
  label: 'Full-Stack Engineer · Islamabad · Working remotely with a UK firm',
  headline: { before: 'I build business platforms ', emphasis: 'end to end', after: ', from requirements to production.' },
  subline:
    'Reporting, accounting, POS and distribution systems for real businesses, plus the automation that runs them while nobody’s watching.',
};

export interface ProofItem {
  /** Rendered as-is for screen readers and when JS is off. */
  display: string;
  countTo?: number;
  prefix?: string;
  suffix?: string;
  /** For "60→5" style figures. */
  from?: string;
  to?: string;
  label: string;
}

export const proof: ProofItem[] = [
  { display: '20–25', label: 'companies run their weekly reporting on MCA Orbit' },
  { display: '60→5', from: '60', to: '5', label: 'min to prepare a weekly flash report' },
  { display: '950+', countTo: 950, suffix: '+', label: 'supplier invoices delivered by my bots, each exactly once' },
  { display: '1,000+', countTo: 1000, suffix: '+', label: 'automated tests across three platforms' },
];

export const principles = [
  {
    title: 'Own it end to end',
    body: 'I take a system from the first requirements conversation to production support. On Orbit, MCA Pro and RestoCore I’m the only developer, so nothing gets lost in a hand-off.',
  },
  {
    title: 'Test before it ships',
    body: 'Playwright and Jest suites cover the flows that touch money and deadlines. There are over 1,000 automated tests across my three main platforms.',
  },
  {
    title: 'Numbers to the paisa',
    body: 'Totals, costing, tax and GP are calculated in code, with explicit rules for the awkward cases. When AI is involved, it explains; the code does the maths.',
  },
  {
    title: 'Built to run unattended',
    body: 'Bots and sync jobs are designed to crash, restart and carry on without doing anything twice. My invoice bots have delivered 950+ invoices, each exactly once.',
  },
];

export interface ExperienceItem {
  when: string;
  org: string;
  role: string;
  body?: string;
}

export const experience: ExperienceItem[] = [
  {
    when: '2024 – present',
    org: 'MCA Global',
    role: 'Full-Stack Engineer · remote, UK firm',
    body: 'Sole developer of MCA Orbit, MCA Pro and mcaaudit; built the supplier-invoice bots and email invoice automation; redesigned the MCA International website.',
  },
  {
    when: '2025 – present',
    org: 'Freelance & own products',
    role: 'Founder and developer',
    body: 'RestoCore (in pilot), the pharma distribution system (client build), and fbreinvoicing (launched, then closed).',
  },
  {
    when: '2024',
    org: 'National IT Board (NITB)',
    role: 'Web Developer Intern',
  },
  {
    when: '2021 – 2025',
    org: 'Air University',
    role: 'BS Software Engineering',
  },
];
