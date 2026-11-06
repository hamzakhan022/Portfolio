'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { site } from '@/content/site';
import { navItems } from './nav-items';

/** A <details> menu: opens without JS; with JS it also closes on link click, Escape and outside click. */
export function MobileNav() {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && el.open) {
        el.open = false;
        el.querySelector('summary')?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) el.open = false;
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details className="mnav" ref={ref}>
      <summary className="icon-btn" aria-label="Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </summary>
      <nav className="mnav__panel" aria-label="Mobile">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.cv} download={site.cvDownloadName} onClick={close}>
              Download CV
            </a>
          </li>
        </ul>
      </nav>
    </details>
  );
}
