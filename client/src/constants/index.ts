import { 
  EStatusErrorCode,
  TEnv,
} from '../types';

export const ENV: TEnv = (process.env.NODE_ENV as TEnv) || 'production';

export const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`;
export const END_POINT = {
  SIGNIN: `${BASE_URL}/users/signin`,
};

export const ERROR_MESSAGE: Record<EStatusErrorCode, string> = {
  [EStatusErrorCode.GENERAL_ERROR]: 'Sorry there is some technical issues',
  [EStatusErrorCode.BAD_REQUEST]: 'Sorry there is something wrong in your request data',
  [EStatusErrorCode.NOT_FOUND]: 'Sorry the data is not found',
  [EStatusErrorCode.RATE_LIMITER]: 'Sorry our server is busy, Please try again later',
  [EStatusErrorCode.UNAUTHORIZED]: 'You are Unauthorized to do this operation',
  [EStatusErrorCode.FORBIDDEN]: 'You do not have access to do this operation',
};
