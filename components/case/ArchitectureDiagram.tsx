import type { Diagram, DiagramNode } from '@/content/projects';

/**
 * Draws a tiered boxes-and-arrows diagram as inline SVG, in theme colours.
 * Wide screens: tiers run left → right. Narrow screens: top → bottom.
 * Both are generated from the same data in content/projects.ts.
 */

interface Spec {
  width: number;
  labelSize: number;
  subSize: number;
  labelLH: number;
  subLH: number;
  padX: number;
  padY: number;
  gap: number; // gap between boxes inside a tier
  tierGap: number; // vertical gap between tiers (narrow only)
}

const WIDE: Spec = { width: 960, labelSize: 15, subSize: 12.5, labelLH: 20, subLH: 17, padX: 14, padY: 16, gap: 24, tierGap: 0 };
const NARROW: Spec = { width: 340, labelSize: 13, subSize: 11.5, labelLH: 17, subLH: 15, padX: 10, padY: 12, gap: 12, tierGap: 44 };
const CHAR = 0.6; // IBM Plex Mono advance width in em

interface Line {
  text: string;
  sub: boolean;
}

interface Box {
  node: DiagramNode;
  x: number;
  y: number;
  w: number;
  h: number;
  lines: Line[];
}

function wrap(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function linesFor(node: DiagramNode, w: number, s: Spec): Line[] {
  const inner = w - s.padX * 2;
  const maxLabel = Math.max(6, Math.floor(inner / (s.labelSize * CHAR)));
  const maxSub = Math.max(6, Math.floor(inner / (s.subSize * CHAR)));
  return [
    ...wrap(node.label, maxLabel).map((text) => ({ text, sub: false })),
    ...(node.sub ?? []).flatMap((t) => wrap(t, maxSub).map((text) => ({ text, sub: true }))),
  ];
}

function heightFor(lines: Line[], s: Spec) {
  const labels = lines.filter((l) => !l.sub).length;
  const subs = lines.length - labels;
  return s.padY * 2 + labels * s.labelLH + (subs ? 4 + subs * s.subLH : 0);
}

function layoutWide(d: Diagram): { boxes: Box[]; height: number } {
  const s = WIDE;
  const n = d.tiers.length;
  const boxW = 188;
  const colGap = n > 1 ? (s.width - n * boxW) / (n - 1) : 0;
  const all = d.tiers.map((tier) => tier.map((node) => linesFor(node, boxW, s)));
  const boxH = Math.max(...all.flat().map((l) => heightFor(l, s)));
  const colHeights = d.tiers.map((t) => t.length * boxH + (t.length - 1) * s.gap);
  const height = Math.max(...colHeights) + 4;
  const boxes: Box[] = [];
  d.tiers.forEach((tier, i) => {
    const top = (height - colHeights[i]) / 2;
    tier.forEach((node, j) => {
      boxes.push({ node, x: i * (boxW + colGap) + 0.5, y: top + j * (boxH + s.gap), w: boxW - 1, h: boxH, lines: all[i][j] });
    });
  });
  return { boxes, height };
}

function layoutNarrow(d: Diagram): { boxes: Box[]; height: number } {
  const s = NARROW;
  const boxes: Box[] = [];
  let y = 2;
  d.tiers.forEach((tier) => {
    const k = tier.length;
    const w = k === 1 ? 220 : (s.width - (k - 1) * s.gap) / k;
    const lines = tier.map((node) => linesFor(node, w, s));
    const rowH = Math.max(...lines.map((l) => heightFor(l, s)));
    const rowW = k * w + (k - 1) * s.gap;
    const left = (s.width - rowW) / 2;
    tier.forEach((node, j) => {
      boxes.push({ node, x: left + j * (w + s.gap) + 0.5, y, w: w - 1, h: rowH, lines: lines[j] });
    });
    y += rowH + s.tierGap;
  });
  return { boxes, height: y - s.tierGap + 2 };
}

function edgePath(a: Box, b: Box, wide: boolean) {
  if (wide) {
    const sx = a.x + a.w;
    const sy = a.y + a.h / 2;
    const tx = b.x;
    const ty = b.y + b.h / 2;
    if (Math.abs(sy - ty) < 1) return `M${sx} ${sy}H${tx}`;
    const mid = sx + (tx - sx) / 2;
    return `M${sx} ${sy}H${mid}V${ty}H${tx}`;
  }
  const sx = a.x + a.w / 2;
  const sy = a.y + a.h;
  const tx = b.x + b.w / 2;
  const ty = b.y;
  if (Math.abs(sx - tx) < 1) return `M${sx} ${sy}V${ty}`;
  const mid = sy + (ty - sy) / 2;
  return `M${sx} ${sy}V${mid}H${tx}V${ty}`;
}

function Svg({ diagram, wide, id, title }: { diagram: Diagram; wide: boolean; id: string; title: string }) {
  const s = wide ? WIDE : NARROW;
  const { boxes, height } = wide ? layoutWide(diagram) : layoutNarrow(diagram);
  const byId = new Map(boxes.map((b) => [b.node.id, b]));
  const marker = `${id}-head`;
  const desc = diagram.edges
    .map(([from, to]) => `${byId.get(from)?.node.label} to ${byId.get(to)?.node.label}`)
    .join('; ');

  return (
    <svg
      className={wide ? 'diagram__wide' : 'diagram__narrow'}
      viewBox={`0 0 ${s.width} ${height}`}
      width={s.width}
      height={height}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{desc}</desc>
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="dg-head" />
        </marker>
      </defs>
      {diagram.edges.map(([from, to]) => {
        const a = byId.get(from);
        const b = byId.get(to);
        if (!a || !b) return null;
        return (
          <path
            key={`${from}-${to}`}
            d={edgePath(a, b, wide)}
            className="dg-edge"
            markerEnd={`url(#${marker})`}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      {boxes.map((b) => {
        let y = b.y + s.padY + s.labelSize * 0.85;
        let prevSub = false;
        return (
          <g key={b.node.id}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="3"
              className={b.node.core ? 'dg-box dg-box--core' : 'dg-box'}
              vectorEffect="non-scaling-stroke"
            />
            {b.lines.map((line, i) => {
              if (i > 0) {
                if (line.sub && !prevSub) y += s.labelLH - s.labelSize * 0.85 + 4 + s.subSize * 0.85;
                else y += line.sub ? s.subLH : s.labelLH;
              }
              prevSub = line.sub;
              const cls = line.sub
                ? `dg-sub${b.node.core ? ' dg-core-sub' : ''}`
                : `dg-label${b.node.core ? ' dg-core-text' : ''}`;
              return (
                <text key={i} x={b.x + s.padX} y={y} fontSize={line.sub ? s.subSize : s.labelSize} className={cls}>
                  {line.text}
                </text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

export function ArchitectureDiagram({ diagram, slug, name }: { diagram: Diagram; slug: string; name: string }) {
  const title = `${name} architecture`;
  return (
    <figure className="diagram">
      <Svg diagram={diagram} wide id={`${slug}-wide`} title={title} />
      <Svg diagram={diagram} wide={false} id={`${slug}-narrow`} title={title} />
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}
