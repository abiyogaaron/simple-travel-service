export type TEnv = 'development' | 'production' | 'test';

export interface IRespBody<T = object> {
  data?: T extends object ? T : object;
  message: string;
  err?: unknown;
} 

export interface IUserState {
  username: string;
  userId: number;
}
