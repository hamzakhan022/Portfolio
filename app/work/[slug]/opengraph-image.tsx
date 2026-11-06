import { caseStudies, getCaseStudy } from '@/content/projects';
import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Case study';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  return renderOg({
    eyebrow: c ? `Case study · ${c.kind}` : 'Case study',
    title: c?.name ?? 'Case study',
    subtitle: c?.result ?? '',
  });
}
