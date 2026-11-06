import { site } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.title}
        </p>
        <p>
          <a href={`mailto:${site.email}`}>Email</a> · <a href={site.linkedin}>LinkedIn</a> ·{' '}
          <a href={site.github}>GitHub</a>
        </p>
      </div>
    </footer>
  );
}
