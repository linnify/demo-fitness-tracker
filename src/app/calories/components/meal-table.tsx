import { cn, displayFractionalNumberLocale } from '@app/lib/utils';
import { UserMeal } from '@app/types/user.type';

const Row = ({
  value,
  header,
  className
}: {
  value: string;
  header?: boolean;
  className?: string;
}) => {
  const spanHeader = header ? 'font-bold text-white' : 'font-medium text-black';
  return (
    <div className={cn('flex items-start justify-between px-6 py-4', className)}>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-base font-medium text-neutral-active'}>
          {' '}
          <span className={spanHeader}>{value}</span>
        </div>
      </div>
    </div>
  );
};

const MealTable = ({ meals, className }: { meals: UserMeal[]; className?: string }) => {
  const renderRow = (meal: UserMeal) => {
    return (
      <div className={'grid grid-cols-2 bg-white md:flex'}>
        <Row
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={meal.meal.name}
        />
        <Row
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={`${displayFractionalNumberLocale(meal.meal.grams * meal.value)}`}
        />
        <Row
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={`${displayFractionalNumberLocale(meal.meal.calories * meal.value)}`}
        />
        <Row
          className={
            'w-full border-b border-r-0 border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0 md:border-r'
          }
          value={`${displayFractionalNumberLocale(meal.meal.fats * meal.value)}`}
        />
        <Row
          className={'w-full border-r border-r-neutral-200 md:w-1/4'}
          value={`${displayFractionalNumberLocale(meal.meal.carbohydrates * meal.value)}`}
        />
        <Row
          className={'w-full md:w-1/4'}
          value={`${displayFractionalNumberLocale(meal.meal.proteins * meal.value)}`}
        />
      </div>
    );
  };

  return (
    <div className={cn('flex w-full flex-col rounded-xl shadow', className)}>
      <div className={'z-10 rounded-t-xl bg-blue-500 py-2 text-white md:flex'}>
        <Row
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={'Meal Name'}
          header={true}
        />
        <Row
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={'Grams'}
          header={true}
        />
        <Row
          className={
            'w-full border-b border-r border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0'
          }
          value={'Calories'}
          header={true}
        />
        <Row
          className={
            'w-full border-b border-r-0 border-b-neutral-200 border-r-neutral-200 md:w-1/4 md:border-b-0 md:border-r'
          }
          value={'Fats'}
          header={true}
        />
        <Row
          className={'w-full border-r border-r-neutral-200 md:w-1/4'}
          value={'Carbohydrates'}
          header={true}
        />
        <Row className={'w-full md:w-1/4'} value={'Proteins'} header={true} />
      </div>

      {!!meals && meals.map((meal) => renderRow(meal))}
    </div>
  );
};

export default MealTable;
