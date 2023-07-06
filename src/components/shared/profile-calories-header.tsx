import { UserProfile } from '@app/../../../types/user.type';
import { cn } from '@app/lib/utils';
import NutritionMeasureLine from '@app/components/shared/nutrition-measure-line';
import { NutrientsType } from '@app/../../../types/nutrients.type';
import {
  getNutrientIcon,
  getNutrientMeasurementUnit,
  getNutrientName
} from '@app/utils/nutrients.utils';

type ProfileCaloriesHeaderProps = {
  user: UserProfile;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  className?: string;
};

const Macronutrient = ({
  value,
  profileValue,
  type,
  className
}: {
  value: number;
  profileValue: number;
  type: NutrientsType;
  className?: string;
}) => {
  const title = getNutrientName(type);
  const unit = getNutrientMeasurementUnit(type);
  const icon = getNutrientIcon(type, { className: 'w-8 h-8' });

  return (
    <div className={cn('flex items-start justify-between px-6 py-4', className)}>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-body-1 text-neutral-dark-hover'}>{title}</div>
        <div className={'text-base font-medium text-neutral-active'}>
          {' '}
          <span className={'font-bold text-black'}>{value}</span> / {profileValue} {unit}
        </div>
        <NutritionMeasureLine
          maxValue={profileValue}
          value={value}
          type={type}
          className={'w-28'}
        />
      </div>
      {icon}
    </div>
  );
};

export default function ProfileCaloriesHeader(props: ProfileCaloriesHeaderProps) {
  const { user, carbohydrates, calories, fats, proteins } = props;
  const profile = user.profile;

  if (!profile) {
    return null;
  }

  return (
    <div className={cn('flex w-full flex-col rounded-xl shadow', props.className)}>
      <div className={'relative flex w-full flex-col'}>
        <div
          className={
            "absolute right-0 z-0 h-full w-1/2 rounded-t-xl bg-[url('/images/profile-header-card.png')] bg-cover bg-center bg-no-repeat"
          }
        ></div>
        <div
          className={
            'z-10 rounded-t-xl bg-gradient-to-r from-black from-50% to-black/0 px-8 py-5 text-white'
          }
        >
          Necesarul tău zilnic de calorii și macronutrienți
        </div>
      </div>

      <div className={'grid grid-cols-2 rounded-b-xl bg-white md:flex'}>
        <Macronutrient
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={calories}
          profileValue={profile.calories ?? 0}
          type={'kcal'}
        />
        <Macronutrient
          className={
            'w-full border-b border-r-0 border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0 md:border-r'
          }
          value={proteins}
          profileValue={profile.proteins ?? 0}
          type={'proteins'}
        />
        <Macronutrient
          className={'w-full border-r border-r-neutral-200 md:w-1/4'}
          value={carbohydrates}
          profileValue={profile.carbohydrates ?? 0}
          type={'carbohydrates'}
        />
        <Macronutrient
          className={'w-full md:w-1/4'}
          value={fats}
          profileValue={profile.fats ?? 0}
          type={'fats'}
        />
      </div>
    </div>
  );
}
