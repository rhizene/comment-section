import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { AsyncState } from "models/asyncState";
import { UserComment } from "models/userComment";
import data from "resources/data.json";
const {comments} = data;

export interface CommentState extends AsyncState {
  items: UserComment[],
  initialized: boolean,
};
  
const initialState:CommentState = {
  items: [],
  status: "idle",
  initialized: false,
};

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  ()=>Promise.resolve(comments)
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: { },
  extraReducers: builder=> {
    builder
      .addCase(fetchComments.pending, state => {state.status = 'loading'})
      .addCase(fetchComments.rejected, state => {state.status = 'failed'})
      .addCase(fetchComments.fulfilled, (state, {payload}) => {
        state.status = 'idle';
        state.initialized = true;
        state.items = [...payload].map(commentData => new UserComment(commentData))
      })
  },
});

export const selectCommentInitialized = (state: RootState) => (state.comments.initialized);
export const selectComments = (state: RootState) => (state.comments.items);

const commentReducer = commentSlice.reducer;
export default commentReducer;
