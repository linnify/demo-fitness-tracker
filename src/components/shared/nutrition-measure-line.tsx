import { cn } from '@app/lib/utils';
import { NutrientsType } from '@app/../../../types/nutrients.type';

type Props = {
  maxValue: number;
  value: number;
  type: NutrientsType;
  className?: string;
  lineClassName?: string;
};

export default function NutritionMeasureLine({
  value,
  type,
  maxValue,
  className,
  lineClassName
}: Props) {
  let percent = (value / maxValue) * 100;

  let backgroundClass = '';

  if (type === 'kcal') {
    backgroundClass = 'bg-kcal';
  } else if (type === 'proteins') {
    backgroundClass = 'bg-proteins';
  } else if (type === 'carbohydrates') {
    backgroundClass = 'bg-carbohydrates';
  } else if (type === 'fats') {
    backgroundClass = 'bg-fats';
  }

  percent = percent >= 100 ? 100 : percent;
  percent = percent <= 0 ? 7 : percent;

  return (
    <div className={cn('h-1.5 w-full rounded bg-neutrals', className)}>
      <div
        className={cn('h-full rounded', backgroundClass, lineClassName)}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
