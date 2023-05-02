import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { EStatusErrorCode, IRespBody } from '../types';
import { ERROR_MESSAGE } from '../constants';

type BodyType = object | string | undefined;
type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IhttpConfig extends AxiosRequestConfig {
  data?: BodyType;
  method: MethodType;
}

export default function httpCall<Response = IRespBody<object>>(url: string, config: IhttpConfig): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    axios(url, config)
      .then((resp: AxiosResponse<Response>) => {
        resolve(resp.data);
      })
      .catch((err: AxiosError<Response>) => {
        let errMessage = ERROR_MESSAGE[err.response?.status as EStatusErrorCode || EStatusErrorCode.GENERAL_ERROR];
        if (err.response) {
          const data = err.response.data as IRespBody;
          errMessage = data.message;
        }

        reject({
          errorCode: err.response?.status || EStatusErrorCode.GENERAL_ERROR,
          message: errMessage,
        });
      });
  });
}
