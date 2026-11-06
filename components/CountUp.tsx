interface Props {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function formatNumber(n: number, decimals = 0) {
  return n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/**
 * Renders the final value on the server, so it is correct without JS.
 * MotionObserver animates it once when it scrolls into view.
 */
export function CountUp({ to, from = 0, decimals = 0, prefix = '', suffix = '', className }: Props) {
  const final = `${prefix}${formatNumber(to, decimals)}${suffix}`;
  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span
        aria-hidden="true"
        data-countup={to}
        data-from={from}
        data-decimals={decimals}
        data-prefix={prefix}
        data-suffix={suffix}
      >
        {final}
      </span>
    </span>
  );
}
