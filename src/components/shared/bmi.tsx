import { cn } from '@app/lib/utils';
import { MAX_BMI } from '@app/profile/utils/profile.utils';

type BMIProps = {
  value: number;
  className?: string;
};

const getBodyMassTitle = (value: number): { title: string; titleClassName: string } => {
  if (value <= 18.49) {
    return { title: 'Subponderal', titleClassName: 'text-bmiLow' };
  } else if (value <= 24.99) {
    return { title: 'Greutate normala', titleClassName: 'text-accent' };
  } else if (value <= 29.99) {
    return { title: 'Supraponderal', titleClassName: 'text-bmiLow/50' };
  } else if (value <= 34.99) {
    return { title: 'Obezitate (gradul I)', titleClassName: 'text-bmiLow/70' };
  } else if (value <= 39.99) {
    return { title: 'Obezitate (gradul II)', titleClassName: 'text-bmiLow/70' };
  }

  return { title: 'Obezitate morbidă', titleClassName: 'text-bmiLow' };
};

const BMILine = ({
  minValue,
  maxValue,
  value,
  className
}: {
  minValue: number;
  maxValue: number;
  value: number;
  className: string;
}) => {
  const renderLine =
    (value > MAX_BMI && maxValue === MAX_BMI) || (value >= minValue && value <= maxValue);
  let linePosition = 0;

  if (renderLine) {
    const rate = value - minValue;
    const lineValues = maxValue - minValue;
    linePosition = (rate / lineValues) * 100;
    linePosition = linePosition >= 100 ? 98 : linePosition;
  }

  return (
    <div className={'relative w-20'}>
      {renderLine && (
        <div
          className={cn('absolute -top-[8px] h-[24px] w-[2px] rounded-md', className)}
          style={{ left: `${linePosition}%` }}
        ></div>
      )}
      <div className={cn('h-2 w-full rounded-lg', className)} />
    </div>
  );
};

export default function BMI({ value, className }: BMIProps) {
  const { title, titleClassName } = getBodyMassTitle(value);

  return (
    <div
      className={cn(
        'flex flex-col gap-y-4 rounded-xl bg-white px-4 py-4 shadow md:px-8 md:py-6',
        className
      )}
    >
      <div className={'flex items-center gap-x-3'}>
        <h6>{value}</h6>
        <div className={cn('text-body1 font-semibold', titleClassName)}>{title}</div>
      </div>

      <div className={'flex flex-col gap-y-3'}>
        <div className={'relative flex gap-x-1'}>
          <BMILine className={'bg-bmiLow'} value={value} minValue={0} maxValue={18.49} />
          <BMILine className={'bg-accent'} value={value} minValue={18.5} maxValue={24.99} />
          <BMILine className={'bg-bmiLow/25'} value={value} minValue={25} maxValue={29.99} />
          <BMILine className={'bg-bmiLow/50'} value={value} minValue={30} maxValue={34.9} />
          <BMILine className={'bg-bmiLow/70'} value={value} minValue={35} maxValue={MAX_BMI} />
        </div>
        <div className={'flex gap-x-1 text-xs font-light text-muted'}>
          <div className={'w-20'}> 0 </div>
          <div className={'w-20'}> 18,5 </div>
          <div className={'w-20'}> 25 </div>
          <div className={'w-20'}> 30 </div>
          <div className={'w-20'}> 35+ </div>
        </div>
      </div>
    </div>
  );
}
