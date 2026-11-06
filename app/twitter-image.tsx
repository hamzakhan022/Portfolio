import { site } from '@/content/site';
import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = `${site.name}, ${site.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: site.title,
    title: site.name,
    subtitle: 'I build business platforms end to end, from requirements to production.',
  });
}
