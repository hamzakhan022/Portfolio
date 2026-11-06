import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import type { Screenshot } from '@/content/projects';

interface Props {
  shot: Screenshot;
  urlLabel: string;
  sizes: string;
  priority?: boolean;
}

/** True when the screenshot file has been added to /public. Checked at build time. */
function hasFile(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', src));
  } catch {
    return false;
  }
}

export function BrowserFrame({ shot, urlLabel, sizes, priority }: Props) {
  const exists = hasFile(shot.src);
  const fileName = shot.src.split('/').pop();

  return (
    <div className="frame">
      <div className="frame__bar" aria-hidden="true">
        <span className="frame__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="frame__url">{urlLabel}</span>
      </div>
      <div className="frame__view">
        {exists ? (
          <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} quality={80} />
        ) : (
          <div className="shot-placeholder" role="img" aria-label={`Screenshot coming soon: ${shot.alt}`}>
            <div className="shot-placeholder__side">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="shot-placeholder__main">
              <i />
              <div className="row">
                <i />
                <i />
                <i />
              </div>
              <i />
              <i />
              <i />
            </div>
            {process.env.NODE_ENV !== 'production' ? (
              <span className="shot-placeholder__caption">{fileName}</span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
