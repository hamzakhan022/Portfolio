import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BrowserFrame } from '@/components/BrowserFrame';
import { ArchitectureDiagram } from '@/components/case/ArchitectureDiagram';
import { formatNumber } from '@/components/CountUp';
import { StatusBadge } from '@/components/StatusBadge';
import { caseStudies, getCaseStudy, type Metric } from '@/content/projects';
import { site } from '@/content/site';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  const url = `/work/${c.slug}`;
  return {
    title: c.seo.title,
    description: c.seo.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: c.seo.title, description: c.seo.description, url, siteName: site.name },
    twitter: { card: 'summary_large_image', title: c.seo.title, description: c.seo.description },
  };
}

function MetricItem({ m }: { m: Metric }) {
  const fmt = (n: number) => `${m.prefix ?? ''}${formatNumber(n, m.decimals ?? 0)}`;
  const spoken =
    m.before !== undefined
      ? `from ${fmt(m.before)} to ${fmt(m.after)}${m.unit ? ` ${m.unit}` : ''}`
      : `${fmt(m.after)}${m.unit ? ` ${m.unit}` : ''}`;
  return (
    <li className="metric reveal">
      <h3 className="label">{m.label}</h3>
      <p className="metric__value">
        <span className="sr-only">{spoken}</span>
        {m.before !== undefined ? (
          <span className="metric__group" aria-hidden="true">
            <span className="metric__before">{fmt(m.before)}</span> <span className="metric__arrow">→</span>
          </span>
        ) : null}
        <span className="metric__group" aria-hidden="true">
          <span className="metric__after">
            <span
              data-countup={m.after}
              data-from={m.before ?? 0}
              data-decimals={m.decimals ?? 0}
              data-prefix={m.prefix ?? ''}
            >
              {fmt(m.after)}
            </span>
          </span>
          {m.unit ? <span className="metric__unit"> {m.unit}</span> : null}
        </span>
      </p>
      {m.note ? <p className="metric__note">{m.note}</p> : null}
    </li>
  );
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const c = caseStudies[index];
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  const links = (
    <>
      {c.links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className={l.primary ? 'btn btn--solid' : 'arrow-link'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {l.label} <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
      {c.linkNote ? <p className="cs-linknote">{c.linkNote}</p> : null}
    </>
  );

  return (
    <article>
      <header className="cs-head container">
        <Link className="cs-back" href="/#work">
          <span aria-hidden="true">←</span> All work
        </Link>
        <div className="cs-head__top">
          <StatusBadge status={c.status} />
          <span className="label">
            Case study {String(index + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')} · {c.kind}
          </span>
        </div>
        <h1 className="cs-title">{c.name}</h1>
        <p className="cs-result">{c.result}</p>
        <div className="cs-links">{links}</div>
      </header>

      <div className="container">
        <dl className="facts">
          <div>
            <dt className="label">Role</dt>
            <dd>{c.facts.role}</dd>
          </div>
          <div>
            <dt className="label">Period</dt>
            <dd className="mono">{c.facts.period}</dd>
          </div>
          <div>
            <dt className="label">Users</dt>
            <dd>{c.facts.users}</dd>
          </div>
          <div>
            <dt className="label">Stack</dt>
            <dd className="mono">{c.facts.stack.join(' · ')}</dd>
          </div>
          <div>
            <dt className="label">Scale</dt>
            <dd className="mono">{c.facts.scale}</dd>
          </div>
        </dl>

        <div className="cs-hero-shot">
          <BrowserFrame
            shot={c.screenshots.hero}
            urlLabel={c.urlLabel}
            sizes="(min-width: 1340px) 1280px, 100vw"
            priority
          />
        </div>
      </div>

      <section className="metrics" aria-labelledby="metrics-title">
        <div className="container">
          <h2 className="label metrics__title" id="metrics-title">
            {c.metricsTitle}
          </h2>
          <ul className="metrics__list">
            {c.metrics.map((m) => (
              <MetricItem key={m.label} m={m} />
            ))}
          </ul>
        </div>
      </section>

      <div className="container">
        <section className="grid block" aria-labelledby="problem-title" style={{ marginTop: 'var(--space-6)' }}>
          <h2 className="label" id="problem-title">
            The problem
          </h2>
          <div className="block__body prose">
            {c.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section className="grid block" aria-labelledby="built-title">
          <h2 className="label" id="built-title">
            What I built
          </h2>
          <div className="block__body">
            <div className="prose">
              {c.built.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="feature-list" style={{ marginTop: 'var(--space-6)' }}>
              {c.built.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="gallery">
              {c.screenshots.gallery.map((s) => (
                <figure key={s.src}>
                  <BrowserFrame shot={s} urlLabel={c.urlLabel} sizes="(min-width: 1340px) 420px, (min-width: 700px) 33vw, 100vw" />
                  {s.caption ? <figcaption className="label">{s.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="block hard" aria-labelledby="hard-title">
          <h2 className="label" id="hard-title" style={{ marginBottom: 'var(--space-5)' }}>
            The hard parts
          </h2>
          <ol className="ledger">
            {c.hardParts.map((h, i) => (
              <li className="ledger__row reveal" key={h.title}>
                <p className="ledger__when hard__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="ledger__main ledger__main--wide">
                  <h3 className="hard__title">{h.title}</h3>
                  <div className="hard__pair">
                    <p>
                      <span className="label">Problem</span>
                      {h.problem}
                    </p>
                    <p>
                      <span className="label">Solution</span>
                      {h.solution}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="block" aria-labelledby="arch-title">
          <h2 className="label" id="arch-title" style={{ marginBottom: 'var(--space-5)' }}>
            Architecture
          </h2>
          <ArchitectureDiagram diagram={c.diagram} slug={c.slug} name={c.name} />
        </section>

        <section className="grid block" aria-labelledby="links-title">
          <h2 className="label" id="links-title">
            Links
          </h2>
          <div className="block__body">
            <div className="cs-links" style={{ marginTop: 0 }}>
              {links}
              {c.status === 'client' ? (
                <Link className="arrow-link" href="/#contact">
                  Ask about licensing <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <nav className="container" aria-label="More case studies">
        <div className="pager">
          <Link href={`/work/${prev.slug}`} rel="prev">
            <span className="label">
              <span aria-hidden="true">←</span> Previous
            </span>
            <span className="pager__name">{prev.name}</span>
          </Link>
          <Link href={`/work/${next.slug}`} rel="next" className="pager__next">
            <span className="label">
              Next <span aria-hidden="true">→</span>
            </span>
            <span className="pager__name">{next.name}</span>
          </Link>
        </div>
      </nav>
      <div className="container" style={{ paddingBlock: 'var(--space-6) var(--space-7)' }}>
        <Link className="arrow-link" href="/#work">
          <span aria-hidden="true">←</span> Back to all work
        </Link>
      </div>
    </article>
  );
}
