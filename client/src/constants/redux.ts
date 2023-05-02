import { IAppState, IUserState } from '../types';

export const INITIAL_USER_STATE: IUserState = {
  username: '',
  userId: '',
  isLoading: false,
};

export const INITIAL_APP_STATE: IAppState = {
  error: {
    code: '',
    message: '',
  },
};
