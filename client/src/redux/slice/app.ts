import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_APP_STATE } from '../../constants/redux';
import { IAppState } from '../../types';

type TAppSaveError = Pick<IAppState['error'], 'code' | 'message'>;

const AppSlice = createSlice({
  name: 'app',
  initialState: INITIAL_APP_STATE,
  reducers: {
    saveError: (state: IAppState, action: PayloadAction<TAppSaveError>) => {
      state.error = action.payload;
    },
  },
});

export const {
  saveError,
} = AppSlice.actions;
export default AppSlice;
