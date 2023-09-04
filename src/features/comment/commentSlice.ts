import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { AsyncState } from "models/asyncState";
import { User } from "models/user";
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

export const addComment = createAsyncThunk(
  'comment/addComment',
  (comment:UserComment) => Promise.resolve(comment)
);

type CommentEdit = {
  id:number
  content:string,
}
export const editComment = createAsyncThunk(
  'comment/editComment',
  (commentEdit:CommentEdit) => Promise.resolve(commentEdit)
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  (id:number) => Promise.resolve({id})
);

export const upvoteComment = createAsyncThunk(
  'comment/upvote',
  (id:number) => Promise.resolve({id})
);

export const downvoteComment = createAsyncThunk(
  'comment/downvote',
  (id:number) => Promise.resolve({id})
);

export const sortComments = createAsyncThunk(
  'SORT_COMMENTS',
  () => Promise.resolve()
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
        state.items = [...payload].map(commentData => new UserComment({
          ...commentData,
          replies: commentData.replies.map(reply=>({
            ...reply,
            user: new User(reply.user)
          })),
          user: new User(commentData.user)
        }))
      })

      .addCase(addComment.pending, state => {state.status = 'loading'})
      .addCase(addComment.rejected, state => {state.status = 'failed'})
      .addCase(addComment.fulfilled, (state, {payload}) => {
        state.status = 'idle';
        state.items.push(payload)
      })

      .addCase(editComment.pending, state => {state.status = 'loading'})
      .addCase(editComment.rejected, state => {state.status = 'failed'})
      .addCase(editComment.fulfilled, (state, {payload}) => {
        const comments = [...state.items];
        comments.every(comment => {
          const isMatch = comment.id === payload.id;
          if(isMatch) {
            comment.content = payload.content;
          }
          return !isMatch;
        })
        state.status = 'idle';
        state.items = comments;
      })

      .addCase(deleteComment.pending, state => {state.status = 'loading'})
      .addCase(deleteComment.rejected, state => {state.status = 'failed'})
      .addCase(deleteComment.fulfilled, (state, {payload}) => {
        const comments = [...state.items].filter(comment => comment.id !== payload.id)
        state.status = 'idle';
        state.items = comments;
      })

      .addCase(upvoteComment.pending, state => {state.status = 'loading'})
      .addCase(upvoteComment.rejected, state => {state.status = 'failed'})
      .addCase(upvoteComment.fulfilled, (state, {payload}) => {
        const comments = [...state.items]
        const isUpvoted = comments.some(comment => {
          if(comment.id === payload.id) {
            comment.score += 1;
            return true;
          }
          return false;
        });
        if(isUpvoted) {
          state.items = comments;
        }
        state.status = 'idle';
      })

      .addCase(downvoteComment.pending, state => {state.status = 'loading'})
      .addCase(downvoteComment.rejected, state => {state.status = 'failed'})
      .addCase(downvoteComment.fulfilled, (state, {payload}) => {
        const comments = [...state.items]
        const isDownvoted = comments.some(comment => {
          if(comment.id === payload.id) {
            comment.score -= 1;
            return true;
          }
          return false;
        });
        if(isDownvoted) {
          state.items = comments;
        }
        state.status = 'idle';
      })

      .addCase(sortComments.fulfilled, (state)=>{
          state.items = state.items.sort(
            (previous,next)=>
              UserComment.sort(previous as UserComment,next as UserComment)
            );
      })
  },
});

export const selectCommentInitialized = (state: RootState) => (state.comments.initialized);
export const selectComments = (state: RootState) => (state.comments.items);

const commentReducer = commentSlice.reducer;
export default commentReducer;
