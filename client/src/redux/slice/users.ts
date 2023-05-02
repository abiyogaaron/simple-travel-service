import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IError,
  IUserState,
} from '../../types';
import { TSigninResponse } from '../../types/response';
import { INITIAL_USER_STATE } from '../../constants/redux';
import { END_POINT } from '../../constants';

import { saveError } from './app';
import { createAppAsyncThunk } from '..';
import httpCall, { IhttpConfig } from '../../utils/httpReq';

type TSigninParams = { email: string, password: string };
export type TSaveUser = Partial<IUserState>;

export const signin = createAppAsyncThunk<Pick<IUserState, 'userId' | 'username'>, TSigninParams>(
  'users/signin',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const config: IhttpConfig = {
        method: 'POST',
        data: { email, password },
        withCredentials: true,
      };
      const response = await httpCall<TSigninResponse>(END_POINT.SIGNIN, config);
      return {
        username: email,
        userId: response.data?.userId || '',
      };
    } catch (e) {
      const error = e as IError;
      dispatch(saveError({
        code: error.errorCode,
        message: error.message,
      }));
      return rejectWithValue(error);
    }
  },
);

const UserSlice = createSlice({
  name: 'users',
  initialState: INITIAL_USER_STATE,
  reducers: {
    saveUser: (state: IUserState, action: PayloadAction<TSaveUser>) => {
      const {
        userId,
        username,
      } = action.payload;

      state.userId = userId || state.userId;
      state.username = username || state.username;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.username = payload.username;
        state.isLoading = false;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  saveUser,
} = UserSlice.actions;
export default UserSlice;
