'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { formatNumber } from './CountUp';

const DURATION = 1200;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function setValue(el: HTMLElement, value: number) {
  const decimals = Number(el.dataset.decimals ?? 0);
  el.textContent = `${el.dataset.prefix ?? ''}${formatNumber(value, decimals)}${el.dataset.suffix ?? ''}`;
}

function runCount(el: HTMLElement) {
  const to = Number(el.dataset.countup);
  const from = Number(el.dataset.from ?? 0);
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / DURATION);
    setValue(el, t === 1 ? to : from + (to - from) * easeOut(t));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** Scroll reveals and count-ups. All content is fully visible without this. */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'));
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-countup]:not([data-counted])'));

    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'));
      root.classList.add('motion-ready');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          if (el.dataset.countup !== undefined) runCount(el);
          else el.classList.add('is-in');
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );

    reveals.forEach((el) => io.observe(el));
    counters.forEach((el) => {
      el.dataset.counted = '1';
      setValue(el, Number(el.dataset.from ?? 0));
      io.observe(el);
    });
    root.classList.add('motion-ready');

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
