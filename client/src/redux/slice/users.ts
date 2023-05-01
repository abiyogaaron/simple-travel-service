import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IUserState,
} from '../../types';
import { INITIAL_USER_STATE } from '../../constants/redux';

export type TSaveUser = Partial<IUserState>;

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
});

export const {
  saveUser,
} = UserSlice.actions;

export default UserSlice;
