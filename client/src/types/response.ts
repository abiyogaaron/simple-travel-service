import { IRespBody } from '.';

interface ISigninData {
  token: string;
  userId: string;
}
export type TSigninResponse = IRespBody<ISigninData>;
