import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container notfound">
      <p className="label">404 / Not found</p>
      <h1>This page isn’t in the ledger.</h1>
      <p className="muted" style={{ marginTop: 'var(--space-4)' }}>
        The link may be out of date.
      </p>
      <p style={{ marginTop: 'var(--space-6)' }}>
        <Link className="btn btn--solid" href="/">
          Back to the home page
        </Link>
      </p>
    </section>
  );
}
