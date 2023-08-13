
import { RootState } from "app/store";
import { User } from "models/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import data from "resources/data.json";

const {currentUser} = data;

export interface UserState {
  currentUser: User,
  status: 'loading'|'idle'|'failed'
};

const NO_USER:User = {
    image: null,
    username: '',
}
  
const initialState:UserState ={
  currentUser: NO_USER,
  status: 'idle'
};


export const fetchCurrentUser = createAsyncThunk(
  'user/fetchUser',
  ()=>Promise.resolve(currentUser)
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: builder=> {
    builder
      .addCase(fetchCurrentUser.pending, state => {state.status = 'loading'})
      .addCase(fetchCurrentUser.rejected, state => {state.status = 'failed'})
      .addCase(fetchCurrentUser.fulfilled, (state, {payload}) => {
        state.status = 'idle';
        state.currentUser = payload;
      })
    
  },
});

export const selectUser = (state: RootState) => (state.currentUser);

const userReducer = userSlice.reducer;
export default userReducer;
