import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import commentReducer from '../features/comment/commentSlice';


export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    comments: commentReducer,
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
