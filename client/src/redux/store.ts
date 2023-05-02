import { 
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { ENV } from '../constants';

import User from './slice/users';
import App from './slice/app';

export const rootReducer = combineReducers({
  [App.name]: App.reducer,
  [User.name]: User.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: ENV !== 'production',
});

export default store;
