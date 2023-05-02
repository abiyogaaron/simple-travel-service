export type TEnv = 'development' | 'production' | 'test';

export enum EStatusErrorCode {
  GENERAL_ERROR = 500,
  RATE_LIMITER = 429,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}
export interface IError {
  errorCode: EStatusErrorCode;
  message: string;
}

export interface IRespBody<T = object> {
  data?: T extends object ? T : object;
  message: string;
  err?: unknown;
} 

/**
 * Redux Type
 */
export interface IAppState {
  error: {
    code: EStatusErrorCode | string;
    message: string;
  }
}
export interface IUserState {
  username: string;
  userId: string;
  isLoading: boolean;
}

