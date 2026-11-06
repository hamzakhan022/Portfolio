import type { ReactNode } from 'react';

interface Props {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}

/** Mono label on the left ("01 / SELECTED WORK"), heading on the right. */
export function SectionHead({ index, label, title, intro, id }: Props) {
  return (
    <div className="grid section__head">
      <p className="label" aria-hidden="true">
        {index ? `${index} / ${label}` : label}
      </p>
      <div className="section__heading">
        <h2 className="section__title" id={id}>
          {title}
        </h2>
        {intro ? <p className="section__intro">{intro}</p> : null}
      </div>
    </div>
  );
}
