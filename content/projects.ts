/**
 * All project content lives in this file.
 * Edit text, numbers and links here — no component changes needed.
 *
 * Screenshots: drop files into /public/work/<slug>/ using the exact file names
 * below. Until a file exists, a neutral placeholder is shown.
 * See /public/work/README.md for the full shot list.
 */

export type CaseStatus = 'live' | 'pilot' | 'client';

export const statusLabel: Record<CaseStatus, string> = {
  live: 'Live',
  pilot: 'In pilot',
  client: 'Client build',
};

export interface Screenshot {
  /** Path under /public, e.g. /work/orbit/orbit-dashboard.png */
  src: string;
  alt: string;
  caption?: string;
}

export interface Metric {
  label: string;
  /** Omit for a single "by the numbers" value. */
  before?: number;
  after: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  note?: string;
}

export interface HardPart {
  title: string;
  problem: string;
  solution: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string[];
  /** The API / core box — drawn filled with ink. */
  core?: boolean;
}

export interface Diagram {
  /** Left-to-right on wide screens, top-to-bottom on narrow ones. */
  tiers: DiagramNode[][];
  edges: [from: string, to: string][];
  caption: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface CaseStudy {
  slug: string;
  name: string;
  kind: string;
  status: CaseStatus;
  /** Label shown in the browser frame's address bar. */
  urlLabel: string;
  /** One-line result, shown on the card and under the case-study title. */
  result: string;
  facts: {
    role: string;
    period: string;
    users: string;
    stack: string[];
    scale: string;
  };
  problem: string[];
  built: { intro: string[]; features: string[] };
  hardParts: HardPart[];
  metricsTitle: string;
  metrics: Metric[];
  diagram: Diagram;
  links: ProjectLink[];
  /** Shown when there is no public link. */
  linkNote?: string;
  screenshots: { hero: Screenshot; gallery: Screenshot[] };
  seo: { title: string; description: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'orbit',
    name: 'MCA Orbit',
    kind: 'Budgeting & weekly flash reporting',
    status: 'live',
    urlLabel: 'mcaorbit.com',
    result:
      'Weekly flash reports for 20–25 hospitality companies now take about 5 minutes, down from up to an hour.',
    facts: {
      role: 'Sole developer, from requirements to production support',
      period: 'Feb 2026 – present',
      users: '15–20 finance staff plus read-only client users, across 20–25 companies',
      stack: [
        'Next.js 14',
        'React',
        'TypeScript',
        'React Query',
        'Python FastAPI',
        'PostgreSQL (Neon)',
        'OpenAI',
        'Vercel',
        'Render',
      ],
      scale: '~108 API routes · ~23 tables · 219 tests',
    },
    problem: [
      'MCA’s finance team prepares budgets and weekly flash reports for multi-site hospitality groups. Each site can run its own fiscal calendar.',
      'The weekly flash report was put together by hand: up to 60 minutes in the first week of a period and around 30 minutes in the weeks after, with manual calendar errors along the way.',
    ],
    built: {
      intro: [
        'An internal MCA platform for budgeting and weekly flash reporting. I’m the only developer and took it from requirements to production support.',
        'It is used by 15–20 finance staff, plus client users with read-only access, across 20–25 hospitality companies. A public demo login lets prospects try it.',
      ],
      features: [
        'Weekly flash report in about 5 minutes',
        'Per-site fiscal calendars',
        'Multi-year budget generation with UK holiday seasonality',
        'Gross profit across grouped, split and negative-cost categories',
        'Inter-site cost allocations',
        'Read-only client access and a public demo login',
      ],
    },
    hardParts: [
      {
        title: 'Every site keeps its own calendar',
        problem:
          'Sites run different fiscal calendars, so week 12 at one site is not week 12 at another. Matching by week number compares the wrong weeks.',
        solution:
          'Weeks are matched by their actual dates, not their numbers, so comparisons line up whatever calendar a site uses. This removed the manual calendar errors.',
      },
      {
        title: 'Budgets from several years of history',
        problem:
          'A budget built from past years should weight recent trading more, allow for UK holidays that move each year, and never use data from the period it is predicting.',
        solution:
          'Budget generation is recency-weighted across multiple years, applies UK holiday seasonality, and only reads data from before the budget period, with no look-ahead.',
      },
      {
        title: 'Gross profit that is actually right',
        problem:
          'Some cost categories are grouped, some are split across lines and some carry negative costs. One generic GP formula gets these wrong.',
        solution:
          'GP is calculated in code with explicit rules for grouped, split and negative-cost categories.',
      },
      {
        title: 'Sharing costs between sites',
        problem:
          'A cost can be allocated from one site to others, and allocations can chain. A careless setup could loop back on itself or hand out more than 100% of a cost.',
        solution:
          'Allocations are modelled as a graph. Saving one runs a cycle check, and the total allocated from any cost is capped at 100%.',
      },
      {
        title: 'A dashboard that took 19.5 seconds',
        problem: 'The main dashboard made 130 database queries and took 19.5 seconds to load.',
        solution:
          'I reworked how the dashboard loads its data: it now makes 10 queries and loads in 2.2 seconds, about 9× faster.',
      },
    ],
    metricsTitle: 'Before → after',
    metrics: [
      { label: 'Weekly flash report', before: 60, after: 5, unit: 'min', note: 'Up to 60 min in the first week, 30 min in other weeks' },
      { label: 'Dashboard load time', before: 19.5, after: 2.2, unit: 's', decimals: 1, note: 'About 9× faster' },
      { label: 'Dashboard database queries', before: 130, after: 10 },
    ],
    diagram: {
      tiers: [
        [{ id: 'users', label: 'Browser', sub: ['Finance staff', 'Client users (read-only)'] }],
        [{ id: 'web', label: 'Next.js 14 app', sub: ['React Query', 'Vercel'] }],
        [{ id: 'api', label: 'FastAPI', sub: ['~108 routes', 'Render'], core: true }],
        [
          { id: 'db', label: 'PostgreSQL', sub: ['Neon', '~23 tables'] },
          { id: 'ai', label: 'OpenAI API', sub: ['External'] },
        ],
      ],
      edges: [
        ['users', 'web'],
        ['web', 'api'],
        ['api', 'db'],
        ['api', 'ai'],
      ],
      caption:
        'The Next.js front end on Vercel calls a Python FastAPI service on Render, which owns the calendar, budget and GP logic and stores data in PostgreSQL on Neon.',
    },
    links: [
      { label: 'Request a demo', href: 'https://mcaorbit.com', primary: true },
      { label: 'mcaorbit.com', href: 'https://mcaorbit.com' },
    ],
    screenshots: {
      hero: {
        src: '/work/orbit/orbit-dashboard.png',
        alt: 'MCA Orbit dashboard showing weekly sales, labour and gross-profit figures for a demo hospitality group',
      },
      gallery: [
        {
          src: '/work/orbit/orbit-flash-report.png',
          alt: 'MCA Orbit weekly flash report comparing actuals with budget for each site',
          caption: 'Weekly flash report',
        },
        {
          src: '/work/orbit/orbit-budget.png',
          alt: 'MCA Orbit budget screen with weekly budget figures generated from previous years',
          caption: 'Budget generation',
        },
      ],
    },
    seo: {
      title: 'MCA Orbit: budgeting and weekly flash reporting',
      description:
        'Case study: a budgeting and weekly flash-reporting platform for multi-site hospitality groups. Weekly reports went from up to 60 minutes to about 5.',
    },
  },
  {
    slug: 'mca-pro',
    name: 'MCA Pro',
    kind: 'Practice management for an accounting firm',
    status: 'live',
    urlLabel: 'mca pro · internal tool',
    result:
      'One system for a UK accounting firm’s clients, recurring filings, sign-offs and team capacity across London and Pakistan.',
    facts: {
      role: 'Sole developer',
      period: '2026',
      users: 'Staff in the firm’s London and Pakistan offices',
      stack: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'next-auth', 'Vercel Cron'],
      scale: '21 screens · 61 API handlers · 25 models · ~526 tests',
    },
    problem: [
      'A UK accounting firm with offices in London and Pakistan runs a lot of recurring work: VAT returns, CT600s, annual accounts, payroll, confirmation statements and self assessment.',
      'Every piece of work has a statutory deadline, a preparer and a reviewer, and the team is split across two timezones.',
    ],
    built: {
      intro: [
        'An internal practice-management platform for MCA. I’m the only developer.',
        'It holds the firm’s clients and their recurring work, tracks every filing to its submission reference, runs preparer → reviewer sign-off and shows leadership where capacity is tight.',
      ],
      features: [
        'Clients and recurring work: VAT, CT600, accounts, payroll, confirmation statements, self assessment',
        'Filings that require their submission reference',
        'Preparer → reviewer sign-off',
        'Capacity planning',
        'Team chat over server-sent events',
        'Leadership dashboards',
      ],
    },
    hardParts: [
      {
        title: 'One reminder at 09:00, in your own timezone',
        problem:
          'Everyone should get exactly one reminder at 09:00 local time. London moves with daylight saving and Pakistan does not, so a single fixed cron time is wrong for someone, and a retried job can send twice.',
        solution:
          'Vercel Cron runs in time slots, and each run picks the people whose local time is 09:00. A unique database constraint per person per day means a second run cannot send a duplicate.',
      },
      {
        title: 'UK statutory deadlines as code',
        problem:
          'Deadlines depend on year ends, periods and filing types. Recurring tasks created from them must never appear twice.',
        solution:
          'Deadlines are pure functions (same input, same date), which makes them easy to test. Recurring tasks are generated so that re-running the generator cannot create duplicates.',
      },
      {
        title: 'Five roles, two branches',
        problem:
          'Five roles across two branches see different clients and can do different things. Hiding buttons in the interface is not enough.',
        solution:
          'Role and branch rules are enforced in the database queries themselves, so a request only ever returns what that person is allowed to see.',
      },
      {
        title: 'Two-factor sign-in, built from scratch',
        problem: 'The platform holds client financial data, so sign-in needed a second factor.',
        solution:
          'I implemented TOTP two-factor authentication from scratch. Each user’s secret is encrypted at rest with AES-256-GCM.',
      },
      {
        title: 'A sign-off you can rely on',
        problem:
          'A preparer → reviewer sign-off only means something if it cannot be skipped or quietly undone.',
        solution:
          'The workflow enforces sign-off integrity: the preparer and reviewer steps are checked, and a filing cannot be completed without its submission reference.',
      },
    ],
    metricsTitle: 'By the numbers',
    metrics: [
      { label: 'Screens', after: 21 },
      { label: 'API handlers', after: 61 },
      { label: 'Automated tests', after: 526, prefix: '~' },
    ],
    diagram: {
      tiers: [
        [{ id: 'users', label: 'Staff', sub: ['London', 'Pakistan'] }],
        [
          { id: 'web', label: 'Next.js 16 app', sub: ['next-auth', 'TOTP 2FA'] },
          { id: 'cron', label: 'Vercel Cron', sub: ['Reminder slots'] },
        ],
        [{ id: 'api', label: 'API handlers', sub: ['61 handlers', 'Role + branch rules'], core: true }],
        [{ id: 'db', label: 'PostgreSQL', sub: ['Prisma', '25 models'] }],
      ],
      edges: [
        ['users', 'web'],
        ['web', 'api'],
        ['cron', 'api'],
        ['api', 'db'],
      ],
      caption:
        'Staff use one Next.js app. API handlers apply role and branch rules before touching PostgreSQL, and Vercel Cron triggers the timezone-aware reminders.',
    },
    links: [],
    linkNote: 'Internal tool — screenshots only.',
    screenshots: {
      hero: {
        src: '/work/mca-pro/mcapro-dashboard.png',
        alt: 'MCA Pro leadership dashboard showing upcoming deadlines and work by status',
      },
      gallery: [
        {
          src: '/work/mca-pro/mcapro-recurring-work.png',
          alt: 'MCA Pro list of recurring work items with service type, deadline, preparer and reviewer',
          caption: 'Recurring work and deadlines',
        },
        {
          src: '/work/mca-pro/mcapro-signoff.png',
          alt: 'MCA Pro filing screen with submission reference field and preparer and reviewer sign-off',
          caption: 'Filing and sign-off',
        },
      ],
    },
    seo: {
      title: 'MCA Pro: practice management for an accounting firm',
      description:
        'Case study: a practice-management platform for a UK accounting firm with offices in London and Pakistan, covering recurring filings, sign-off and capacity.',
    },
  },
  {
    slug: 'restocore',
    name: 'RestoCore',
    kind: 'Restaurant POS & back office',
    status: 'pilot',
    urlLabel: 'restocore · pilot',
    result:
      'A multi-tenant restaurant POS and back office for Pakistan, with PRA, KPRA and FBR e-invoicing and a till that keeps working offline.',
    facts: {
      role: 'My own product, built end to end',
      period: '2026',
      users: 'Restaurants in Pakistan, in pilot',
      stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind', 'shadcn/ui', 'Vercel'],
      scale: '51 screens · 155 server actions · 69 tables · ~274 tests',
    },
    problem: [
      'Restaurants in Pakistan have to issue tax invoices through PRA, KPRA or FBR, keep the till running when the connection drops, and still get the kitchen, stock and costing right.',
    ],
    built: {
      intro: [
        'RestoCore is my own SaaS product, now in pilot. It is multi-tenant, with four subscription plans.',
        'It covers the front of house and the back office: taking the order, sending it to the kitchen, issuing the tax invoice and closing the day.',
      ],
      features: [
        'Till with offline mode',
        'Live kitchen display',
        'Floor plan',
        'Inventory, recipe costing and purchasing',
        'Staff and payroll',
        'End-of-day Z-reports',
        'PRA, KPRA and FBR e-invoicing',
        '4 subscription plans',
      ],
    },
    hardParts: [
      {
        title: 'Never fake a tax invoice',
        problem:
          'When a tax authority is slow or rejects an invoice, the tempting shortcut is to print something that looks valid anyway.',
        solution:
          'Each authority has its own adapter. Failures are split into ones worth retrying and genuine rejections, and the system never presents an invoice as filed when it was not.',
      },
      {
        title: 'Offline till, exactly-once upload',
        problem:
          'When the internet drops, the till keeps selling. When it comes back, every sale has to reach the server exactly once: not lost, not doubled.',
        solution:
          'Sales are queued on the device and uploaded with exactly-once handling, so a retry after a flaky connection cannot create a duplicate.',
      },
      {
        title: 'Kitchen and payment at the same moment',
        problem:
          'A waiter can send items to the kitchen while the cashier is taking payment on the same order.',
        solution: 'Row locks in PostgreSQL make those updates take turns, so the order always ends in one consistent state.',
      },
      {
        title: 'Many restaurants, one shared till',
        problem:
          'Many restaurants share one database, and several staff share one till at each restaurant.',
        solution:
          'Row-level security keeps each restaurant’s data separate, and staff PINs protect actions on the shared till.',
      },
      {
        title: 'Reports that reconcile to the rupee',
        problem: 'End-of-day figures have to agree with each other, and with the money taken.',
        solution: 'Z-reports and back-office reports are built to reconcile to the rupee.',
      },
    ],
    metricsTitle: 'Results & scale',
    metrics: [
      { label: 'Send to kitchen', before: 6.5, after: 3.5, unit: 's', decimals: 1 },
      { label: 'Database tables', after: 69 },
      { label: 'Automated tests', after: 274, prefix: '~' },
    ],
    diagram: {
      tiers: [
        [
          { id: 'till', label: 'Till', sub: ['Offline queue'] },
          { id: 'kds', label: 'Kitchen display' },
          { id: 'office', label: 'Back office' },
        ],
        [{ id: 'api', label: 'Server actions', sub: ['155 actions', 'Next.js · Vercel'], core: true }],
        [
          { id: 'db', label: 'Supabase Postgres', sub: ['Row-level security', '69 tables'] },
          { id: 'rt', label: 'Supabase Realtime', sub: ['Live kitchen'] },
          { id: 'tax', label: 'Tax adapters', sub: ['PRA · KPRA · FBR'] },
        ],
      ],
      edges: [
        ['till', 'api'],
        ['kds', 'api'],
        ['office', 'api'],
        ['api', 'db'],
        ['api', 'rt'],
        ['api', 'tax'],
      ],
      caption:
        'Every screen goes through server actions. Data lives in Supabase Postgres behind row-level security, Realtime drives the kitchen display, and one adapter per tax authority handles e-invoicing.',
    },
    links: [],
    linkNote: 'In pilot — screenshots only.',
    screenshots: {
      hero: {
        src: '/work/restocore/restocore-till.png',
        alt: 'RestoCore till screen with menu categories, an open order and payment buttons',
      },
      gallery: [
        {
          src: '/work/restocore/restocore-kitchen-display.png',
          alt: 'RestoCore kitchen display showing incoming orders as tickets',
          caption: 'Live kitchen display',
        },
        {
          src: '/work/restocore/restocore-z-report.png',
          alt: 'RestoCore end-of-day Z-report with sales, tax and payment totals',
          caption: 'End-of-day Z-report',
        },
      ],
    },
    seo: {
      title: 'RestoCore: restaurant POS and back office',
      description:
        'Case study: a multi-tenant restaurant POS and back office for Pakistan with PRA, KPRA and FBR e-invoicing and an offline till.',
    },
  },
  {
    slug: 'pharma-distribution',
    name: 'Pharma distribution system',
    kind: 'Billing, stock & credit ledger',
    status: 'client',
    urlLabel: 'pharma distribution · client build',
    result:
      'An offline-first billing, stock and credit-ledger system for a medicine distributor, replacing one that got their pricing wrong.',
    facts: {
      role: 'Freelance. I own the product and can license it',
      period: 'Sep 2026 – present',
      users: 'A medicine distributor: billing, salesmen and recovery',
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'Service worker', 'IndexedDB', 'Vercel'],
      scale: '49 screens · 87 API endpoints · 22 models · 28 test suites',
    },
    problem: [
      'The distributor’s previous system got their pricing wrong and had problems with stock and recovery.',
      'Distributor pricing has several layers (MRP, trade price, discount, bonus units and tax), applied to stock that is tracked by batch and expiry. Billing also has to carry on when the internet does not.',
    ],
    built: {
      intro: [
        'An offline-first billing, stock and credit-ledger (khata) system that replaced the client’s previous one.',
        'I own the product, so it can be licensed to other distributors as a white-label setup.',
      ],
      features: [
        'Batch and expiry stock, sold first-expiry-first-out (FEFO)',
        'Distributor pricing: MRP → trade price → discount, bonus units, tax',
        'Credit ledger (khata) and recovery sheets',
        'Salesman approvals, beats and routes',
        'Day-close cash reconciliation',
        'Reports',
      ],
    },
    hardParts: [
      {
        title: 'Exactly-once offline sync',
        problem:
          'Invoices created offline must reach the server exactly once, even when an upload is retried after a dropped connection.',
        solution:
          'Every change goes into an outbox with an idempotency key. The server recognises a key it has already processed, so a retry cannot create a second invoice.',
      },
      {
        title: 'Real invoice numbers, even offline',
        problem:
          'Invoice numbers have to be real and sequential, but a PC that is offline cannot ask the server for the next one.',
        solution:
          'Numbers are reserved in advance from a PostgreSQL sequence, so offline invoices still get genuine numbers that never collide.',
      },
      {
        title: 'Two PCs selling the same batch',
        problem: 'Two billing PCs can try to sell the last units of the same batch at the same moment.',
        solution:
          'Row and advisory locks in PostgreSQL, plus holds on stock while it sits in a cart, stop a batch from being oversold.',
      },
      {
        title: 'Costing to the paisa',
        problem: 'Stock value and margins depend on weighted-average cost, and rounding errors add up over time.',
        solution: 'Weighted-average costing is calculated paisa-accurately in code.',
      },
    ],
    metricsTitle: 'By the numbers',
    metrics: [
      { label: 'Screens', after: 49 },
      { label: 'API endpoints', after: 87 },
      { label: 'Scenario & concurrency test suites', after: 28 },
    ],
    diagram: {
      tiers: [
        [
          { id: 'pcs', label: 'Billing PCs' },
          { id: 'sales', label: 'Salesmen' },
        ],
        [{ id: 'sw', label: 'Service worker', sub: ['IndexedDB outbox', 'Reserved numbers'] }],
        [{ id: 'api', label: 'API', sub: ['87 endpoints', 'Idempotency keys'], core: true }],
        [{ id: 'db', label: 'PostgreSQL', sub: ['Prisma', 'Sequence · locks'] }],
      ],
      edges: [
        ['pcs', 'sw'],
        ['sales', 'sw'],
        ['sw', 'api'],
        ['api', 'db'],
      ],
      caption:
        'Each device writes to a local outbox first. The service worker syncs it to the API with idempotency keys, and PostgreSQL provides invoice numbers and the locks that keep stock correct.',
    },
    links: [],
    linkNote: 'Client system — screenshots only. Available to license as a white-label setup.',
    screenshots: {
      hero: {
        src: '/work/pharma-distribution/pharma-invoice.png',
        alt: 'Pharma distribution system invoice screen showing MRP, trade price, discount, bonus units and tax per line',
      },
      gallery: [
        {
          src: '/work/pharma-distribution/pharma-stock-batches.png',
          alt: 'Stock screen listing batches of one product with expiry dates and quantities',
          caption: 'Batch and expiry stock',
        },
        {
          src: '/work/pharma-distribution/pharma-recovery-sheet.png',
          alt: 'Recovery sheet listing outstanding customer balances on a route',
          caption: 'Recovery sheet',
        },
      ],
    },
    seo: {
      title: 'Pharma distribution system: offline-first billing and stock',
      description:
        'Case study: an offline-first billing, stock and credit-ledger system for a medicine distributor, with batch/expiry stock and exactly-once sync.',
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* AI & automation                                                            */
/* -------------------------------------------------------------------------- */

export interface AutomationItem {
  name: string;
  status: string;
  summary: string;
  figure: { value: string; countTo?: number; suffix?: string; label: string };
  details: string[];
  stack: string[];
}

export const automation: AutomationItem[] = [
  {
    name: 'mcaaudit',
    status: 'Demo only · not deployed yet',
    summary:
      'An AI accounts-review platform for MCA. It reads ledgers, cash books, bank statements and management packs (Excel, CSV, PDF and accounting exports) and explains each error down to the exact row or cell.',
    figure: { value: '19', countTo: 19, label: 'automated checks, including a three-pass bank-to-books reconciliation' },
    details: [
      'Built to replace a manual first-pass review that takes 30 minutes for clean books and 2–3 hours when there are errors.',
      'Code does the maths, AI does the judgement. Every cited row is checked against the file.',
      'Junior staff never see fixes (a three-layer safeguard). Admin feedback builds a training library. Prompt caching and per-user budget caps keep costs in check.',
    ],
    stack: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'Claude API'],
  },
  {
    name: 'Supplier Invoice RPA Suite',
    status: '13 deployments · 11 client sites',
    summary:
      'Bots that log in to supplier and utility portals (Booker, FreshDirect, BT, Albion, Castle Water), collect invoices and deliver them.',
    figure: { value: '950+', countTo: 950, suffix: '+', label: 'invoices delivered, each exactly once' },
    details: [
      '5 bots running across 13 deployments.',
      'Crash-safe state tracking, verified Gmail API sends, retries for pending invoices and self-healing browser profiles, scheduled with Windows Task Scheduler.',
    ],
    stack: ['Python', 'Playwright', 'Gmail API', 'Windows Task Scheduler'],
  },
  {
    name: 'Email invoice automation',
    status: 'Running unattended since Jul 2025',
    summary:
      'Reads supplier emails and their PDFs, classifies each one as an invoice, statement or query, and forwards only the invoices to AutoEntry (Sage).',
    figure: { value: '16', countTo: 16, label: 'sites for 9 hospitality clients' },
    details: ['Handles mail from about 460 supplier senders.'],
    stack: ['Python', 'Gmail API'],
  },
];

/* -------------------------------------------------------------------------- */
/* More work                                                                  */
/* -------------------------------------------------------------------------- */

export interface MoreWorkItem {
  when: string;
  name: string;
  heading?: string;
  body: string[];
  stack: string[];
  link?: ProjectLink;
  note?: string;
}

export const moreWork: MoreWorkItem[] = [
  {
    when: 'Pre-launch',
    name: 'MCA International website',
    body: [
      'A redesign of the firm’s website in PHP and vanilla JavaScript, with a custom flat-file CMS, scroll-driven animation and interactive finance tools: a deal-value builder, a gross-profit calculator and a funding quiz.',
      'Images are 57% lighter than before.',
    ],
    stack: ['PHP', 'Vanilla JS', 'Flat-file CMS'],
    link: { label: 'View the final design', href: 'https://mca-website-nu.vercel.app/' },
    note: 'Going live on mcainternational.net',
  },
  {
    when: '2025 – 2026',
    name: 'fbreinvoicing',
    heading: 'Launched, then closed: what I learned',
    body: [
      'My first SaaS: multi-tenant FBR e-invoicing. I launched it, but leads didn’t turn into paying customers, so I closed it in 2026.',
      'The lesson: validate demand and sell before building. The FBR integration work wasn’t wasted. It now powers RestoCore’s e-invoicing.',
    ],
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],
  },
];
