export interface IRespBody<T> {
  data?: T extends object ? T : object;
  message: string;
  err?: unknown;
} 
