import { Action, ThunkAction } from '@reduxjs/toolkit';

import Store, { rootReducer } from '../store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;
export type AppThunk<T = void> = ThunkAction<Promise<T>, RootState, undefined, Action<string>>;
