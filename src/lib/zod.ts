import { z, defaultErrorMap, ZodErrorMap } from 'zod';

export const appErrorMap: ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === 'undefined' || issue.received === 'null') {
      return { message: 'Campul este obligatoriu' };
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { message: 'Campul este obligatoriu' };
  }

  if (issue.code === z.ZodIssueCode.too_small && issue.type === 'string') {
    return { message: 'Campul este obligatoriu' };
  }

  return defaultErrorMap(issue, ctx);
};
