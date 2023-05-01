import { TEnv } from '../types';

export const ENV: TEnv = (process.env.NODE_ENV as TEnv) || 'production';

export const BASE_URL = `${window.location.origin}:${process.env.PORT}/api`;
export const END_POINT = {
  SIGNIN: `${BASE_URL}/users/signin`,
};
