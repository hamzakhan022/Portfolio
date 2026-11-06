import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { MotionObserver } from '@/components/MotionObserver';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { site, siteUrl } from '@/content/site';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  style: 'normal',
  display: 'swap',
  variable: '--font-fraunces',
});

/** Italic is only used for short accents, so it isn't preloaded (keeps it off the critical path). */
const frauncesItalic = Fraunces({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  preload: false,
  variable: '--font-fraunces-italic',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const defaultTitle = `${site.name}: ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: defaultTitle, template: `%s · ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl() }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    url: '/',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F3EC' },
    { media: '(prefers-color-scheme: dark)', color: '#12110E' },
  ],
};

/** Runs before first paint: marks JS as available and applies a saved theme choice. */
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}})();`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.title,
  url: siteUrl(),
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Air University' },
  worksFor: { '@type': 'Organization', name: 'MCA Global' },
  knowsAbout: ['Next.js', 'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Playwright', 'Automation'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${frauncesItalic.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionObserver />
        <Analytics />
      </body>
    </html>
  );
}
