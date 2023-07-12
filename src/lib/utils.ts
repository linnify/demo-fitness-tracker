import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { add, addHours, format, nextMonday } from 'date-fns';

export const DAYS = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
export const MONTHS = [
  'Ianuaire',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decmebrie'
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return value.toLocaleString('ro-RO');
}

export function formatDate(date: Date | null): string {
  if (!date) {
    return '';
  }

  return format(date, 'dd-MM-yyyy');
}

export function getDateMonth(date: Date | null): Date | undefined {
  if (!date) {
    return undefined;
  }

  return new Date(date.getUTCFullYear(), date.getUTCMonth());
}

/**
 * Return the Date in UTC and not in user timezone
 */
export function getNextDeliveryDate(): Date {
  const now = new Date();
  const tomorrow = add(now, {
    days: 1
  });
  const dayOfWeek = tomorrow.getDay();

  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0; // 5 = Friday, 6 = Saturday, 0 = Sunday

  if (isWeekend) {
    return nextMonday(tomorrow);
  }

  return tomorrow;
}

export function getDateAsString(date: Date): string {
  const dayOfTheWeek = date.getDay();
  const dayOfTheMonth = date.getDate();
  const month = date.getMonth();

  return `${DAYS[dayOfTheWeek]}, ${dayOfTheMonth} ${MONTHS[month]}`;
}

export const displayFractionalNumberLocale = (value: number | string): string => {
  const numberValue: number = typeof value === 'string' ? +value : value;
  return (numberValue ? numberValue : 0).toLocaleString(navigator.language, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
};
