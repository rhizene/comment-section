import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import _ from "lodash";
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

export type ReplyInfo = {
  commentId:number,
  userName:string,
};

type AddComment = {
  comment: UserComment,
  replyTo?:ReplyInfo,
}
export const addComment = createAsyncThunk(
  'comment/addComment',
  (addComment:AddComment) => Promise.resolve(addComment)
);

type CommentEdit = {
  id:number
  content:string,
}
export const editComment = createAsyncThunk(
  'comment/editComment',
  (commentEdit:CommentEdit) => Promise.resolve(commentEdit)
);

type DeletedComment = {
  id:number,
  repliedFrom?:number
}
export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  (deletedComment:DeletedComment) => Promise.resolve(deletedComment)
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
        
        if(payload.replyTo === undefined ) {
          state.items.push(payload.comment)
        } else {
          const {replyTo} = payload;
          const comments = _.cloneDeep(state.items) as UserComment[];
          const repliedComment = UserComment.findById(comments, replyTo.commentId);
          if(repliedComment !== null) {
            payload.comment.replyingTo = replyTo.userName;
            repliedComment.addReply(payload.comment);
            state.items = comments;
          }
        }
        state.status = 'idle';
      })

      .addCase(editComment.pending, state => {state.status = 'loading'})
      .addCase(editComment.rejected, state => {state.status = 'failed'})
      .addCase(editComment.fulfilled, (state, {payload}) => {
        const comments = _.cloneDeep(state.items) as UserComment[];
        const editedComment = UserComment.findById(comments, payload.id);
        if(editedComment !== null) {
          editedComment.content = payload.content;
          state.items = comments;
        }
        state.status = 'idle';
      })

      .addCase(deleteComment.pending, state => {state.status = 'loading'})
      .addCase(deleteComment.rejected, state => {state.status = 'failed'})
      .addCase(deleteComment.fulfilled, (state, {payload}) => {
        const comments = _.cloneDeep(state.items) as UserComment[];
        if(payload.repliedFrom === undefined ) {
          state.items = comments.filter(comment => comment.id !== payload.id)
        } else {
          const parentComment = UserComment.findById(comments, payload.repliedFrom);
          if(parentComment !== null) {
            parentComment.deleteReply(payload.id);
            state.items = comments;
          }
        }
        
        state.status = 'idle';
      })

      .addCase(upvoteComment.pending, state => {state.status = 'loading'})
      .addCase(upvoteComment.rejected, state => {state.status = 'failed'})
      .addCase(upvoteComment.fulfilled, (state, {payload}) => {
        const comments = _.cloneDeep(state.items) as UserComment[];
        const existingComment = UserComment.findById(comments as UserComment[], payload.id);
        const found = existingComment !== null;
        if(found) {
          existingComment.upvote();
          state.items = comments;
        }
        state.status = 'idle';
      })

      .addCase(downvoteComment.pending, state => {state.status = 'loading'})
      .addCase(downvoteComment.rejected, state => {state.status = 'failed'})
      .addCase(downvoteComment.fulfilled, (state, {payload}) => {
        const comments = _.cloneDeep(state.items) as UserComment[];
        const existingComment = UserComment.findById(comments as UserComment[], payload.id);
        const found = existingComment !== null;
        if(found) {
          existingComment.downvote();
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
