import Link from 'next/link';
import { BrowserFrame } from '@/components/BrowserFrame';
import { CountUp } from '@/components/CountUp';
import { SectionHead } from '@/components/SectionHead';
import { StatusBadge } from '@/components/StatusBadge';
import { experience, hero, principles, proof } from '@/content/home';
import { automation, caseStudies, moreWork } from '@/content/projects';
import { site } from '@/content/site';
import { testimonials } from '@/content/testimonials';

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="grid">
        <div className="hero__content">
          <p className="label hero__label">{hero.label}</p>
          <h1 className="hero__title" id="hero-title">
            {hero.headline.before}
            <em>{hero.headline.emphasis}</em>
            {hero.headline.after}
          </h1>
          <p className="hero__sub">{hero.subline}</p>
          <div className="hero__actions">
            <a className="btn btn--solid" href="#work">
              See my work
            </a>
            <a className="btn btn--outline" href="#contact">
              Get in touch
            </a>
          </div>
          <p className="status">
            <span className="dot" aria-hidden="true" />
            {site.availability}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProofBar() {
  return (
    <section className="proof" aria-label="Results in numbers">
      <div className="container">
        <ul className="proof__list">
          {proof.map((item) => (
            <li className="proof__item" key={item.label}>
              <span className="proof__num">
                {item.from && item.to ? (
                  <>
                    <span className="sr-only">{`From ${item.from} to ${item.to}`}</span>
                    <span aria-hidden="true">
                      {item.from}
                      <span className="arrow">→</span>
                      <span data-countup={item.to} data-from={item.from} data-decimals={0}>
                        {item.to}
                      </span>
                    </span>
                  </>
                ) : item.countTo !== undefined ? (
                  <CountUp to={item.countTo} prefix={item.prefix} suffix={item.suffix} />
                ) : (
                  item.display
                )}
              </span>
              <span className="proof__label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SelectedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          index="01"
          label="Selected work"
          id="work-title"
          title="Four business platforms I built end to end."
          intro="Budgeting, practice management, restaurant POS and pharma distribution, each with its own case study covering the problem, the hard parts and the numbers."
        />
        <ul className="cases">
          {caseStudies.map((c, i) => (
            <li className="case-card reveal" key={c.slug}>
              <BrowserFrame
                shot={c.screenshots.hero}
                urlLabel={c.urlLabel}
                sizes="(min-width: 1340px) 640px, (min-width: 900px) 50vw, 100vw"
                priority={i < 2}
              />
              <div className="case-card__meta">
                <StatusBadge status={c.status} />
                <span className="label case-card__kind">{c.kind}</span>
              </div>
              <h3 className="case-card__title">
                <Link href={`/work/${c.slug}`}>{c.name}</Link>
              </h3>
              <p className="case-card__result">{c.result}</p>
              <p className="stack-line">{c.facts.stack.join(' · ')}</p>
              <span className="arrow-link" aria-hidden="true">
                Read case study <span aria-hidden="true">→</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Automation() {
  return (
    <section className="section" id="automation" aria-labelledby="automation-title">
      <div className="container">
        <SectionHead
          index="02"
          label="AI & automation"
          id="automation-title"
          title="Bots and AI tools that take repetitive work off people’s desks."
        />
        <ul className="auto-grid">
          {automation.map((a) => (
            <li className="auto-card reveal" key={a.name}>
              <p className="label">{a.status}</p>
              <h3 className="auto-card__name">{a.name}</h3>
              <p className="auto-card__summary">{a.summary}</p>
              <div className="auto-card__figure">
                <span className="auto-card__num">
                  {a.figure.countTo !== undefined ? (
                    <CountUp to={a.figure.countTo} suffix={a.figure.suffix} />
                  ) : (
                    a.figure.value
                  )}
                </span>
                <span className="auto-card__figlabel">{a.figure.label}</span>
              </div>
              <ul className="auto-card__details">
                {a.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="stack-line">{a.stack.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MoreWork() {
  return (
    <section className="section" id="more" aria-labelledby="more-title">
      <div className="container">
        <SectionHead index="03" label="More work" id="more-title" title="Other things I’ve shipped." />
        <ul className="ledger">
          {moreWork.map((m) => (
            <li className="ledger__row reveal" key={m.name}>
              <p className="ledger__when">{m.when}</p>
              <div className="ledger__main">
                <h3 className="ledger__title">{m.name}</h3>
                {m.heading ? <p className="lesson">{m.heading}</p> : null}
                <div className="ledger__body" style={{ marginTop: 'var(--space-3)' }}>
                  {m.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="ledger__aside">
                <p className="stack-line">{m.stack.join(' · ')}</p>
                {m.link ? (
                  <p>
                    <a className="arrow-link" href={m.link.href} target="_blank" rel="noopener noreferrer">
                      {m.link.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                ) : null}
                {m.note ? <p className="muted">{m.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowIWork() {
  return (
    <section className="band" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHead index="04" label="How I work" id="approach-title" title="Four rules I build by." />
        <ol className="principles">
          {principles.map((p, i) => (
            <li className="principle reveal" key={p.title}>
              <p className="principle__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="principle__title">{p.title}</h3>
              <p className="principle__body">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead index="05" label="Experience" id="experience-title" title="Experience and education." />
        <ol className="ledger">
          {experience.map((e) => (
            <li className="ledger__row reveal" key={e.org}>
              <p className="ledger__when">{e.when}</p>
              <div className="ledger__main ledger__main--wide">
                <h3 className="ledger__title">{e.org}</h3>
                <p className="ledger__sub">{e.role}</p>
                {e.body ? (
                  <p className="ledger__body" style={{ marginTop: 'var(--space-3)' }}>
                    {e.body}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Hidden until content/testimonials.ts has real LinkedIn recommendations. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section" id="recommendations" aria-labelledby="recommendations-title">
      <div className="container">
        <SectionHead label="Recommendations" id="recommendations-title" title="What people I’ve worked with say." />
        <ul className="quotes">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="quote">
                <blockquote>
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>, {t.role}
                  {t.relationship ? <span className="muted"> · {t.relationship}</span> : null}
                  <br />
                  <a href={t.source} target="_blank" rel="noopener noreferrer">
                    View on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contact() {
  const rows: { label: string; value: string; href: string; download?: string; external?: boolean }[] = [
    { label: 'LinkedIn', value: 'muhammad-ameer-hamza', href: site.linkedin, external: true },
    { label: 'GitHub', value: 'hamzakhan022', href: site.github, external: true },
    { label: 'CV', value: 'Download CV (PDF)', href: site.cv, download: site.cvDownloadName },
  ];
  if (site.calendly) rows.push({ label: 'Call', value: 'Book a 30-minute call', href: site.calendly, external: true });

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="grid section__head">
          <p className="label" aria-hidden="true">
            06 / Contact
          </p>
          <div className="section__heading">
            <h2 className="contact__title" id="contact-title">
              Hiring, or have a process that should run itself? Let’s talk.
            </h2>
            <a className="contact__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <p className="contact__note">
              Based in {site.location}, {site.workSetup}. {site.availability}.
            </p>
            <ul className="contact__links">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(r.download ? { download: r.download } : {})}
                  >
                    <span className="label">{r.label}</span>
                    <span className="contact__value">
                      {r.value}
                      {r.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </span>
                    <span aria-hidden="true">{r.download ? '↓' : '↗'}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
