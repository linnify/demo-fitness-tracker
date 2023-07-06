import { createHash } from 'crypto';
import envConfig from '@app/config/env.config';

export const hashToken = (token: string): string => {
  const secret = envConfig.auth.secret;
  return createHash('sha256').update(`${token}${secret}`).digest('hex');
};
