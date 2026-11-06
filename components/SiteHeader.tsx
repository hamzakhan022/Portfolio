import Link from 'next/link';
import { site } from '@/content/site';
import { MobileNav } from './MobileNav';
import { navItems } from './nav-items';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="brand">
          {site.shortName}
        </Link>
        <div className="nav">
          <nav aria-label="Main">
            <ul className="nav__links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn--outline btn--mono nav__cv" href={site.cv} download={site.cvDownloadName}>
            Download CV
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
