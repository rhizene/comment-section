
import { currentUser } from 'resources/data.json';
import userReducer, { UserState, fetchCurrentUser } from "./userSlice";
import { act } from 'react-dom/test-utils';

describe('user reducer', () => {
    const initialState: UserState = {
      currentUser: {
        image: {png: ''},
        username: 'test user'
      },
      status: 'idle',
    };
    const UNKOWN_ACTION = { type: 'unknown' };
    it('should have an initial state', () => {
      const expected = initialState
      const actual = userReducer(initialState, UNKOWN_ACTION)
      expect(actual).toEqual(expected);
    });

    it('should fetch user from data.json', () => {
      const expected = currentUser;

      act(()=>{
        const actual = userReducer(undefined, {type: fetchCurrentUser.fulfilled, payload: currentUser});
        expect(actual.currentUser).toBe(expected);
      })

    
    });
  
  });
  