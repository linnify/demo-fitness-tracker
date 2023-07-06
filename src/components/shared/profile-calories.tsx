import { cn, formatNumber } from '@app/lib/utils';
import NutritionMeasureLine from '@app/components/shared/nutrition-measure-line';
import { NutrientsType } from '@app/../../../types/nutrients.type';
import {
  getNutrientIcon,
  getNutrientMeasurementUnit,
  getNutrientName
} from '@app/utils/nutrients.utils';

type ProfileCaloriesProps = {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  className?: string;
};

const ProfileMacronutrient = ({
  value,
  type,
  className
}: {
  value: number;
  type: NutrientsType;
  className?: string;
}) => {
  const title = getNutrientName(type);
  const unit = getNutrientMeasurementUnit(type);
  const icon = getNutrientIcon(type, { className: 'w-8 h-8 mt-4' });

  return (
    <div className={cn('flex gap-6', className)}>
      <div className={'flex flex-col'}>
        <div className={'text-body-1 font-medium leading-snug text-neutral-active'}>{title}</div>
        <div className={'mb-2 mt-1 text-base font-medium text-neutral-active'}>
          <span className={'font-bold tracking-wide text-black'}>{value}</span> {unit}
        </div>
        <NutritionMeasureLine maxValue={value} value={value} type={type} className={'w-28'} />
      </div>

      {icon}
    </div>
  );
};

export default function ProfileCalories({ className, ...props }: ProfileCaloriesProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-6 rounded-xl bg-white px-4 py-4 shadow md:px-8 md:py-6',
        className
      )}
    >
      <div className={'flex w-full items-center justify-between gap-x-2'}>
        <ProfileMacronutrient value={props.calories} type={'kcal'} />
        <div className={'h-[64px] w-[1px] bg-neutral-200'}></div>
        <ProfileMacronutrient value={props.proteins} type={'proteins'} />
      </div>
      <div className={'h-[1px] w-full bg-neutral-200'}></div>

      <div className={'flex w-full items-center justify-between'}>
        <ProfileMacronutrient value={props.carbs} type={'carbohydrates'} />
        <div className={'h-[64px] w-[1px] bg-neutral-200'}></div>
        <ProfileMacronutrient value={props.fats} type={'fats'} />
      </div>
    </div>
  );
}
