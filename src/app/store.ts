import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import scoreReducer from '../features/comment/score/scoreSlice';
import userReducer from '../features/user/userSlice';


export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    score: scoreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
