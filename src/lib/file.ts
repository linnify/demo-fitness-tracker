import envConfig from '@app/config/env.config';

/**
 * Return the full path URL
 * @param path
 */
export const getFileUrl = (path: string): string => {
  return `${envConfig.gcs.url}/${path}`;
};
