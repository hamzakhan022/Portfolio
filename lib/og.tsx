import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

async function font(file: string) {
  return readFile(path.join(process.cwd(), 'lib', 'og-fonts', file));
}

interface OgProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

/** 1200×630 social card: paper background, Fraunces title, accent rule, mono labels. */
export async function renderOg({ eyebrow, title, subtitle }: OgProps) {
  const [fraunces, plexSans, plexMono] = await Promise.all([
    font('fraunces-latin-400-normal.woff'),
    font('ibm-plex-sans-latin-400-normal.woff'),
    font('ibm-plex-mono-latin-500-normal.woff'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4EDE0',
          color: '#14213D',
          padding: '72px 80px',
          fontFamily: 'Plex Sans',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Plex Mono',
            fontSize: 22,
            letterSpacing: 2,
            color: '#5E6475',
            textTransform: 'uppercase',
            borderBottom: '1px solid #DDD3C2',
            paddingBottom: 24,
          }}
        >
          <span>{eyebrow}</span>
          <span>Islamabad · Remote</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'Fraunces', fontSize: title.length > 22 ? 68 : 84, lineHeight: 1.05, letterSpacing: -1.5 }}>
            {title}
          </div>
          <div style={{ width: 120, height: 6, background: '#FF6B5B', marginTop: 36, marginBottom: 32 }} />
          <div style={{ fontSize: 32, lineHeight: 1.35, color: '#2E3A57', maxWidth: 940 }}>{subtitle}</div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Plex Mono',
            fontSize: 22,
            color: '#5E6475',
            borderTop: '1px solid #DDD3C2',
            paddingTop: 24,
          }}
        >
          <span>{site.name}</span>
          <span>{site.title}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 400, style: 'normal' },
        { name: 'Plex Sans', data: plexSans, weight: 400, style: 'normal' },
        { name: 'Plex Mono', data: plexMono, weight: 500, style: 'normal' },
      ],
    },
  );
}
