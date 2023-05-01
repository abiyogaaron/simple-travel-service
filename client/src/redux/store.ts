import { 
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { ENV } from '../constants';

import User from './slice/users';

export const rootReducer = combineReducers({
  [User.name]: User.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: ENV !== 'production',
});

export default store;
