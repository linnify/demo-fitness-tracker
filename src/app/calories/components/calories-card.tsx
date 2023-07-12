import { Totals, UserProfile } from '@app/types/user.type';
import { cn, displayFractionalNumberLocale } from '@app/lib/utils';

type ProfileCaloriesHeaderProps = {
  totals: Totals;
  className?: string;
};

const nutrientTitles: Record<string, string> = {
  kcal: 'Calories',
  proteins: 'Proteins',
  carbohydrates: 'Carbohydrates',
  fats: 'Fats'
};

const nutrientUnit: Record<string, string> = {
  kcal: 'kcal',
  proteins: 'gr',
  carbohydrates: 'gr',
  fats: 'gr'
};

const Macronutrient = ({
  value,
  profileValue,
  type,
  className
}: {
  value: number;
  profileValue: number;
  type: string;
  className?: string;
}) => {
  const title = nutrientTitles[type];
  const unit = nutrientUnit[type];

  return (
    <div className={cn('flex items-start justify-between px-6 py-4', className)}>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-body-1 text-neutral-dark-hover'}>{title}</div>
        <div className={'text-base font-medium text-neutral-active'}>
          {' '}
          <span className={'font-bold text-black'}>
            {displayFractionalNumberLocale(value)}
          </span> / {displayFractionalNumberLocale(profileValue)} {unit}
        </div>
      </div>
    </div>
  );
};

export default function ProfileCaloriesHeader(props: ProfileCaloriesHeaderProps) {
  const { totals } = props;

  return (
    <div className={cn('flex w-full flex-col rounded-xl shadow', props.className)}>
      <div
        className={
          'z-10 rounded-t-xl bg-blue-500 from-black from-50% to-black/0 px-8 py-5 text-white'
        }
      >
        Your daily recommended intake
      </div>

      <div className={'grid grid-cols-2 rounded-b-xl bg-white md:flex'}>
        <Macronutrient
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={totals.consumed.calories ?? 0}
          profileValue={totals.indicated.calories ?? 0}
          type={'kcal'}
        />
        <Macronutrient
          className={
            'w-full border-b border-r-0 border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0 md:border-r'
          }
          value={totals.consumed.proteins ?? 0}
          profileValue={totals.indicated.proteins ?? 0}
          type={'proteins'}
        />
        <Macronutrient
          className={'w-full border-r border-r-neutral-200 md:w-1/4'}
          value={totals.consumed.carbohydrates ?? 0}
          profileValue={totals.indicated.carbohydrates ?? 0}
          type={'carbohydrates'}
        />
        <Macronutrient
          className={'w-full md:w-1/4'}
          value={totals.consumed.fats ?? 0}
          profileValue={totals.indicated.fats ?? 0}
          type={'fats'}
        />
      </div>
    </div>
  );
}
