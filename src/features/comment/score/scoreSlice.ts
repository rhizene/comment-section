import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export interface ScoreState {
  score: number
};
  
const initialState ={
  score: 0
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    upvote: state=> {state.score +=1;},
    downvote: state=> {state.score -=1;},
  }
});

export const selectScore = (state: RootState) => (state.score);

export const {downvote, upvote} = scoreSlice.actions;

const scoreReducer = scoreSlice.reducer;
export default scoreReducer;