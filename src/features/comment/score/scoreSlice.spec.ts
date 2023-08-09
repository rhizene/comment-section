import scoreReducer, { ScoreState, downvote, upvote } from "./scoreSlice";

describe('score reducer', () => {
  const initialState: ScoreState = {
    score: 5,
  };
  const UNKOWN_ACTION = { type: 'unknown' };
  it('should have an initial state', () => {
    expect(scoreReducer(initialState, UNKOWN_ACTION)).toEqual(initialState);
  });

  it('should handle upvotes', () => {
    const expected = initialState.score + 1;
    const actual = scoreReducer(initialState, upvote());
    expect(actual.score).toEqual(expected);
  });

  it('should handle downvotes', () => {
    const expected = initialState.score - 1;
    const actual = scoreReducer(initialState, downvote());
    expect(actual.score).toEqual(expected);
  });
});
