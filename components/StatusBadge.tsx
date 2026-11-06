import { statusLabel, type CaseStatus } from '@/content/projects';

export function StatusBadge({ status }: { status: CaseStatus }) {
  return (
    <span className={`badge badge--${status}`}>
      <span className={`dot dot--${status}`} aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}
