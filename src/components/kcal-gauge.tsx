'use client';

import { cn, formatNumber } from '@app/lib/utils';
import { useEffect, useRef, useState } from 'react';

type KCalGaugeProps = {
  current: number;
  total: number;
  disabled?: boolean;
};

export default function KCalGauge({ current, total, disabled }: KCalGaugeProps) {
  const svgRef = useRef<SVGPathElement>(null);
  const [gaugeValue, setGaugeValue] = useState<number>(0);
  const [pathLength, setPathLength] = useState<number>();

  useEffect(() => {
    const pathLength = svgRef.current?.getTotalLength() ?? 0;
    const emptyValue = pathLength - 2;

    let value = (1 - current / total) * pathLength;
    value = value < 0 ? 1 : value;

    setPathLength(pathLength);
    setGaugeValue(value === pathLength ? emptyValue : value);
  }, [current, total]);

  return (
    <div>
      <div className={'relative flex min-w-[132px] flex-col items-center'}>
        <svg
          className={'absolute'}
          width="126"
          height="69"
          viewBox="0 0 126 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M120 63C120 31.5198 94.4802 6 63 6C31.5198 6 6 31.5198 6 63"
            stroke="#EAECF0"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>

        <svg
          className={cn('absolute', gaugeValue === 0 ? 'hidden' : 'block')}
          width="126"
          height="69"
          viewBox="0 0 126 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          strokeDasharray={pathLength}
          strokeDashoffset={gaugeValue}
          style={{ transform: 'scale(-1, 1)' }}
        >
          <path
            ref={svgRef}
            d="M120 63C120 31.5198 94.4802 6 63 6C31.5198 6 6 31.5198 6 63"
            stroke="#243839"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
        <h6 className={cn('mt-8 text-center', disabled ? 'text-neutral-active' : '')}>
          {formatNumber(current)}
        </h6>
        <div
          className={cn(
            'text-body-2 text-center',
            disabled ? 'text-neutral-active' : 'text-neutral-dark'
          )}
        >
          din {formatNumber(total)} kcal
        </div>
      </div>
    </div>
  );
}
