import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './types';
import { IError } from '../types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState,
  dispatch: AppDispatch,
  rejectValue: IError,
  // extra: { s: string; n: number }
}>();
