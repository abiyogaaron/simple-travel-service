export enum ECookieNames {
  USER_TOKEN = 'T_USER',
}

export interface IRespBody<T = object> {
  data?: T extends object ? T : object;
  message: string;
  err?: unknown;
} 
